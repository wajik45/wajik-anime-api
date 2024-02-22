export default async function getHtmlData({ url }: { url: string }) {
  const response = await fetch(url);
  const htmlData = await response.text();

  return htmlData;
}
