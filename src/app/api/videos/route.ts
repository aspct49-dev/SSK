import { NextResponse } from 'next/server';

export const revalidate = 1800; // re-fetch RSS every 30 minutes

export interface VideoData {
  id:    string;
  title: string;
  date:  string;
  views: string;
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function cleanTitle(raw: string): string {
  return raw
    .replace(/^\d+\/\d+\/\d+\s*💥?\s*/u, '')   // strip leading date like "27/5/26💥"
    .replace(/\s*#\S+/gu, '')                   // strip hashtags
    .replace(/\s*@\S+/gu, '')                   // strip @mentions
    .replace(/💥/gu, ' ').replace(/🔥/gu, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseRSS(xml: string): VideoData[] {
  const entries = xml.split('<entry>').slice(1);
  return entries
    .map(entry => {
      const id        = (/<yt:videoId>([^<]+)</.exec(entry))?.[1] ?? '';
      const rawTitle  = (/<title>([^<]+)</.exec(entry))?.[1] ?? '';
      const published = (/<published>([^<]+)</.exec(entry))?.[1] ?? '';
      const viewsRaw  = (/<media:statistics views="(\d+)"/.exec(entry))?.[1] ?? '0';
      if (!id) return null;
      return {
        id,
        title: cleanTitle(rawTitle),
        date:  published ? formatDate(published) : '',
        views: formatViews(Number(viewsRaw)),
      };
    })
    .filter(Boolean) as VideoData[];
}

export async function GET() {
  try {
    const res = await fetch(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UCFoiuu2enDeoG6Xtl7Bi3xg',
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) throw new Error(`RSS ${res.status}`);
    const videos = parseRSS(await res.text());
    return NextResponse.json(videos);
  } catch (err) {
    console.error('YouTube RSS fetch failed:', err);
    return NextResponse.json([], { status: 502 });
  }
}
