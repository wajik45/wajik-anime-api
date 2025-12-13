export default function generateSrcFromIframeTag(html?: string): string {
  const iframeMatch = html?.match(/<iframe[^>]+src="([^"]+)"/i);
  const src = iframeMatch ? iframeMatch[1] || "No iframe found" : "No iframe found";

  return src;
}
