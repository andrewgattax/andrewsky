// @ts-ignore
import favicon32 from "/favicon-32x32.png"
// @ts-ignore
import favicon16 from "/favicon-16x16.png"
// @ts-ignore
import faviconApple from "/apple-touch-icon.png"

// Applies to all pages (cannot be overridden)
export function Head() {
  const title = "Cambiami";
  const description = "Cambiami description";
  const image = "/images/logo/HORIZONTAL_FULL.png";
  const url = "sos.com";

  return (
    <>
      {/* Basic SEO - Title and Description are handled by +config.ts */}
      <meta name="keywords" content="nightclub queue management, digital queue, virtual line, bar queue app, nightlife app, skip the line, QueueR" />
      <meta name="author" content="QueueR Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Icon shown in the browser tab (aka favicon) */}
      <link rel="icon" sizes={"32x32"} href={favicon32} type="image/svg+xml" />
      <link rel="icon" sizes={"16x16"} href={favicon16} type="image/svg+xml" />
      <link rel="apple-touch-icon" sizes={"180x180"} href={faviconApple} type="image/svg+xml" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      {/* og:title and og:description are handled by +config.ts */}
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="QueueR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </>
  )
}