export function getPageNumberFromUrl(url: string | null) {
    if (!url) return null;
    const urlObj = new URL(url);
    return urlObj.searchParams.get("page");
}
  