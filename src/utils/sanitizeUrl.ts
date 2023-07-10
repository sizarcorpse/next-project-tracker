const sanitizeUrl = (url: string): string => {
  const trimmedUrl = url.trim();
  const hasProtocol =
    trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://");
  const hasWww = trimmedUrl.startsWith("www.");

  if (hasProtocol && hasWww) {
    return trimmedUrl;
  } else if (hasProtocol && !hasWww) {
    return `https://www.${trimmedUrl.slice(trimmedUrl.indexOf("//") + 2)}`;
  } else if (!hasProtocol && hasWww) {
    return `https://${trimmedUrl}`;
  } else {
    return `https://www.${trimmedUrl}`;
  }
};

export default sanitizeUrl;
