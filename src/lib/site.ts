export const SITE_URL = "https://smokecali.co.uk";
export const SITE_NAME = "Smoke Cali";
export const SITE_TAGLINE = "Manchester Smoke Shop";
export const SITE_LOGO = "/favicon.svg";

export function pageUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${trimmed.endsWith("/") ? trimmed : `${trimmed}/`}`;
}
