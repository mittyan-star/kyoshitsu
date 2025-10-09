export const withBase = (path: string): string => {
  if (!path) return path;

  const isExternal = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path);
  if (isExternal) {
    return path;
  }

  if (/^[a-z][a-z0-9+.-]*:/.test(path) || path.startsWith('#')) {
    return path;
  }

  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
};
