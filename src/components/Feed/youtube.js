export const youtubeIdFromUrl = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '').trim();
      return id || null;
    }
    const v = u.searchParams.get('v');
    if (v) return v;
    const parts = u.pathname.split('/').filter(Boolean);
    const embedIdx = parts.indexOf('embed');
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    return null;
  } catch {
    return null;
  }
};

export const youtubeThumb = (url) => {
  const id = youtubeIdFromUrl(url);
  if (!id) return null;
  // maxres is sharper; hqdefault is the reliable fallback
  return {
    primary: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    fallback: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  };
};

export const youtubeEmbed = (url, { autoplay = false } = {}) => {
  const id = youtubeIdFromUrl(url);
  if (!id) return null;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    controls: '1',
    fs: '1',
    iv_load_policy: '3',
    enablejsapi: '1',
    ...(origin ? { origin } : {}),
    ...(autoplay ? { autoplay: '1' } : {}),
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
};
