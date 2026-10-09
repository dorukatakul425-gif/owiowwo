import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { YouTubeSearchResult } from "./youtube.types";
import { getYouTubeApiKey } from "./youtube-config.server";

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export const searchYouTube = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ query: z.string().min(1).max(200), pageToken: z.string().max(200).optional() }).parse(d))
  .handler(async ({ data }): Promise<YouTubeSearchResult> => {
    const key = getYouTubeApiKey();
    if (!key) return { tracks: [], nextPageToken: null, error: "YouTube API anahtarı eklenmemiş." };
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.search = new URLSearchParams({
      part: "snippet", type: "video", videoEmbeddable: "true", videoCategoryId: "10",
      maxResults: "24", q: data.query, key, ...(data.pageToken ? { pageToken: data.pageToken } : {}),
    }).toString();
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error("YouTube error", res.status, await res.text());
        return { tracks: [], nextPageToken: null, error: res.status === 403 ? "YouTube API anahtarı geçersiz veya kota doldu." : "YouTube araması başarısız oldu." };
      }
      const json = (await res.json()) as { nextPageToken?: string; items?: { id: { videoId?: string }; snippet: { title: string; channelTitle: string; thumbnails: { medium?: { url: string }; default?: { url: string } } } }[] };
      const tracks = (json.items ?? []).flatMap((i) => {
        const id = i.id.videoId;
        if (!id) return [];
        return [{ id, title: decode(i.snippet.title), channel: decode(i.snippet.channelTitle),
          image: i.snippet.thumbnails.medium?.url ?? i.snippet.thumbnails.default?.url ?? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` }];
      });
      return { tracks, nextPageToken: json.nextPageToken ?? null, error: null };
    } catch (e) {
      console.error(e);
      return { tracks: [], nextPageToken: null, error: "YouTube'a ulaşılamadı. Tekrar deneyin." };
    }
  });
