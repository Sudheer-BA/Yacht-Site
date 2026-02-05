const assets = require("./_data/assets.js");
const gallery = require("./_data/gallery.js");
const site = require("./_data/site.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("assets", assets);
  eleventyConfig.addGlobalData("gallery", gallery);
  eleventyConfig.addGlobalData("site", site);

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  return {
    dir: {
      input: "pages",
      output: "_site",
      includes: "_includes",
    },
  };
};
