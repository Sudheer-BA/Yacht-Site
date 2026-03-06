const gallery = require("./_data/gallery.js");
const site = require("./_data/site.js");
const { buildSchema } = require("./_data/schema.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("gallery", gallery);
  eleventyConfig.addGlobalData("site", site);

  eleventyConfig.addFilter("schemaForPage", (siteData, page, title, description) =>
    buildSchema({ site: siteData, page, title, metaDescription: description })
  );

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("date", (value, format) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return "";
    if (format === "YYYY-MM-DD") return d.toISOString().slice(0, 10);
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("CNAME");

  return {
    pathPrefix: "",
    dir: {
      input: "pages",
      output: "_site",
      includes: "_includes",
    },
  };
};
