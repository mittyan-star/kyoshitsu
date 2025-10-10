import Parser from 'rss-parser';

export interface NoteFeedItem {
  title?: string;
  link?: string;
  isoDate?: string;
  contentSnippet?: string;
  thumbnailUrl?: string;
}

interface RawNoteFeedItem extends Parser.Item {
  title?: string | null;
  link?: string | null;
  guid?: string | null;
  isoDate?: string | null;
  pubDate?: string | null;
  updated?: string | null;
  summary?: string | null;
  content?: string | null;
  description?: string | null;
  contentSnippet?: string | null;
  'content:encoded'?: string | null;
  'dc:date'?: string | null;
  'media:thumbnail'?: unknown;
  'media:content'?: unknown;
  [key: string]: unknown;
}

const parser = new Parser<unknown, RawNoteFeedItem>();

const HTML_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

const decodeHtmlEntities = (value: string): string =>
  value.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (match, entity) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const codePoint = Number.parseInt(entity.slice(2), 16);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }
    if (entity.startsWith('#')) {
      const codePoint = Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }
    return HTML_ENTITIES[entity] ?? match;
  });

const stripCData = (value: string) => value.replace(/<!\[CDATA\[|\]\]>/g, '');

const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]+/g;

const sanitizeValue = (value?: string | null): string | undefined => {
  if (!value) return undefined;

  const decoded = decodeHtmlEntities(stripCData(value));
  const withoutTags = decoded.replace(/<[^>]*>/g, ' ');
  const withoutControlChars = withoutTags.replace(CONTROL_CHARS_REGEX, ' ');
  const normalized = withoutControlChars.replace(/\s+/g, ' ').trim();

  return normalized.length > 0 ? normalized : undefined;
};

const buildContentSnippet = (raw?: string | null): string | undefined => sanitizeValue(raw);

const extractThumbnailUrl = (value: unknown): string | undefined => {
  const trySanitize = (raw?: string | null) => {
    if (typeof raw !== 'string') return undefined;
    const sanitized = sanitizeValue(raw);
    if (!sanitized) return undefined;
    return /^https?:\/\//i.test(sanitized) ? sanitized : undefined;
  };

  const traverse = (node: unknown, visited = new Set<unknown>()): string | undefined => {
    if (!node || visited.has(node)) {
      return undefined;
    }
    visited.add(node);

    if (typeof node === 'string') {
      return trySanitize(node);
    }

    if (Array.isArray(node)) {
      for (const entry of node) {
        const result = traverse(entry, visited);
        if (result) return result;
      }
      return undefined;
    }

    if (typeof node === 'object') {
      const record = node as Record<string, unknown>;

      const directUrl = trySanitize(record.url as string | undefined);
      if (directUrl) return directUrl;

      const hrefUrl = trySanitize(record.href as string | undefined);
      if (hrefUrl) return hrefUrl;

      if (record.$ && typeof record.$ === 'object') {
        const nested = traverse(record.$, visited);
        if (nested) return nested;
      }

      for (const value of Object.values(record)) {
        const result = traverse(value, visited);
        if (result) return result;
      }
    }

    return undefined;
  };

  return traverse(value);
};

const pickFirstSanitizedValue = (
  item: RawNoteFeedItem,
  fields: (keyof RawNoteFeedItem)[],
): string | undefined => {
  for (const field of fields) {
    const raw = item[field];
    if (typeof raw === 'string') {
      const sanitized = sanitizeValue(raw);
      if (sanitized) {
        return sanitized;
      }
    }
  }
  return undefined;
};

const parseDateValue = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

const pickFirstDateValue = (
  item: RawNoteFeedItem,
  fields: (keyof RawNoteFeedItem)[],
): string | undefined => {
  for (const field of fields) {
    const raw = item[field];
    const parsed = parseDateValue(typeof raw === 'string' ? raw : undefined);
    if (parsed) {
      return parsed;
    }
  }
  return undefined;
};

export async function fetchNoteFeed(feedUrl: string, limit?: number): Promise<NoteFeedItem[]> {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const feed = await parser.parseString(xml);
  const items: NoteFeedItem[] = [];

  for (const entry of feed.items ?? []) {
    const title = pickFirstSanitizedValue(entry, ['title']);
    const link = pickFirstSanitizedValue(entry, ['link', 'guid']);
    const contentSnippet = buildContentSnippet(
      pickFirstSanitizedValue(entry, [
        'content:encoded',
        'content',
        'summary',
        'description',
        'contentSnippet',
      ]),
    );
    const isoDate =
      pickFirstDateValue(entry, ['isoDate', 'pubDate', 'dc:date', 'updated']) ?? undefined;
    const thumbnailUrl =
      extractThumbnailUrl(entry['media:thumbnail']) ?? extractThumbnailUrl(entry['media:content']);

    items.push({
      title,
      link,
      isoDate,
      contentSnippet,
      thumbnailUrl,
    });

    if (limit && items.length >= limit) {
      break;
    }
  }

  return items;
}
