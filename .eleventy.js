const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Copy `css/fonts/` to `_site/css/fonts`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addWatchTarget("assets/css/");

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("asPostDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("asPostItemDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  });
};
