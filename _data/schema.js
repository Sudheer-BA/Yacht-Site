/**
 * Builds JSON-LD structured data for the current page. Used by .eleventy.js as global data.
 */
function buildSchema(data) {
  const site = data.site || {};
  const siteUrl = (site.siteUrl || "").replace(/\/$/, "");
  const pageUrl = data.page?.url || "/";
  const canonical = siteUrl + (pageUrl.startsWith("/") ? pageUrl : "/" + pageUrl);
  const title = data.metaTitle || data.title || "Yacht Charters";
  const description = (data.metaDescription || "").trim();

  const organization = {
    "@type": "Organization",
    name: "Yacht Charters",
    url: siteUrl,
    email: site.email,
    telephone: site.phoneTel || site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location || "Fort Lauderdale, FL",
    },
  };

  const graph = [organization];

  // BreadcrumbList (all pages)
  const breadcrumbItems = [
    { name: "Home", url: siteUrl + "/" },
  ];
  if (pageUrl !== "/" && pageUrl !== "/index.html") {
    if (pageUrl.startsWith("/about")) breadcrumbItems.push({ name: "About", url: siteUrl + "/about/" });
    else if (pageUrl.startsWith("/charters")) breadcrumbItems.push({ name: "Charters & Rates", url: siteUrl + "/charters/" });
    else if (pageUrl.startsWith("/gallery")) breadcrumbItems.push({ name: "Gallery", url: siteUrl + "/gallery/" });
    else if (pageUrl.startsWith("/contact")) breadcrumbItems.push({ name: "Contact", url: siteUrl + "/contact/" });
  }
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  });

  // WebSite for homepage
  if (pageUrl === "/" || pageUrl === "/index.html") {
    graph.push({
      "@type": "WebSite",
      "@id": siteUrl + "#website",
      name: title,
      url: siteUrl,
      description: description || "Luxury yacht charters from Fort Lauderdale. Fully crewed charters aboard Knot Caught Slippin, Azimut Magellano 66.",
    });
  }

  // Page-specific type
  let pageType = "WebPage";
  if (pageUrl.startsWith("/contact")) pageType = "ContactPage";
  else if (pageUrl.startsWith("/about")) pageType = "AboutPage";
  else if (pageUrl.startsWith("/charters")) pageType = "WebPage";
  else if (pageUrl.startsWith("/gallery")) pageType = "CollectionPage";

  const webPage = {
    "@type": pageType,
    "@id": canonical + "#webpage",
    name: title,
    url: canonical,
  };
  // Only add description when it adds information (not duplicate of title)
  const titleNorm = title.replace(/\s*\|\s*Yacht Charters\s*$/i, "").trim().toLowerCase();
  const descStart = description.slice(0, 60).trim().toLowerCase();
  if (description && titleNorm !== descStart) {
    webPage.description = description;
  }
  if (pageUrl === "/" || pageUrl === "/index.html") {
    webPage.isPartOf = { "@id": siteUrl + "#website" };
  }
  graph.push(webPage);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

module.exports = { buildSchema };
