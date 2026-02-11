const gallery = require("./_data/gallery.js");
const site = require("./_data/site.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("gallery", gallery);
  eleventyConfig.addGlobalData("site", site);

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: "pages",
      output: "_site",
      includes: "_includes",
    },
  };
};
