// Read only from the server environment; never ship a private API key in source.
export function getYouTubeApiKey(): string {
  return process.env['YOUTUBE_API_KEY'] || '';
}
