module.exports = function (eleventyConfig) {
  // Copy images, css, and js to output
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
