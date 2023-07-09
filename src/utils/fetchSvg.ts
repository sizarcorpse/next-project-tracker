import DOMPurify from "dompurify";

const fetchSvg = async (url: string): Promise<string> => {
  const svgData = await (await fetch(url)).text();
  const sanitizedSvgData = DOMPurify.sanitize(svgData);
  return sanitizedSvgData;
};
export default fetchSvg;
