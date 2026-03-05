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

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");

  return {
    pathPrefix: "",
    dir: {
      input: "pages",
      output: "_site",
      includes: "_includes",
    },
  };
};
