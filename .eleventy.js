const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });
  
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy("./app/admin/config.yml");
  eleventyConfig.addPassthroughCopy("./app/admin/index.html");
  eleventyConfig.addPassthroughCopy({
    "./app/assets/images": "./static/images",
    "./app/assets/fonts": "./static/fonts",
  });

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./app/favicon.ico");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "app/",
    },
    htmlTemplateEngine: "njk",
  };
};
