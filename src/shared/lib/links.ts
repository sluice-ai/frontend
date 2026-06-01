export function isInternalRouteHref(href?: string): href is string {
  return Boolean(href && href.startsWith("/") && !href.startsWith("//"));
}
