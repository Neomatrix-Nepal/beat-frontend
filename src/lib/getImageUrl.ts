import { baseURL } from "../hooks/useApi";

const getNormalizedImageUrl = (url: string | null) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const path = url.replace(/^\/+/, "");
  return `${baseURL.replace(/\/$/, "")}/${path}`;
};
export default getNormalizedImageUrl