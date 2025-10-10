export interface NoteFeedItem {
  title?: string;
  link?: string;
  isoDate?: string;
  contentSnippet?: string;
}

const ITEM_PATTERN = /<item[\s\S]*?<\/item>/gi;

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

const extractTagValue = (xml: string, tagName: string): string | undefined => {
  const pattern = new RegExp(`<${tagName}(?:\s[^>]*)?>([\s\S]*?)<\/${tagName}>`, 'i');
  const match = pattern.exec(xml);
  return match ? sanitizeValue(match[1]) : undefined;
};

const extractFirstAvailable = (xml: string, tagNames: string[]): string | undefined => {
  for (const tag of tagNames) {
    const value = extractTagValue(xml, tag);
    if (value) return value;
  }
  return undefined;
};

const buildContentSnippet = (raw?: string): string | undefined => {
  if (!raw) return undefined;
  const withoutTags = raw.replace(/<[^>]*>/g, ' ');
  const normalized = withoutTags.replace(/\s+/g, ' ').trim();
  return normalized.length > 0 ? normalized : undefined;
};

export async function fetchNoteFeed(feedUrl: string, limit?: number): Promise<NoteFeedItem[]> {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const items: NoteFeedItem[] = [];

  for (const match of xml.matchAll(ITEM_PATTERN)) {
    const itemXml = match[0];
    const title = extractFirstAvailable(itemXml, ['title']);
    const link = extractFirstAvailable(itemXml, ['link', 'guid']);
    const description = extractFirstAvailable(itemXml, ['content:encoded', 'description', 'summary']);
    const dateValue = extractFirstAvailable(itemXml, ['pubDate', 'dc:date', 'updated']);

    let isoDate: string | undefined;
    if (dateValue) {
      const parsed = new Date(dateValue);
      if (!Number.isNaN(parsed.getTime())) {
        isoDate = parsed.toISOString();
      }
    }

    items.push({
      title,
      link,
      isoDate,
      contentSnippet: buildContentSnippet(description),
    });

    if (limit && items.length >= limit) {
      break;
    }
  }

  return items;
}
