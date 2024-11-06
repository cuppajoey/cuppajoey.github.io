const { DateTime } = require("luxon");
const fs = require("fs");
const CarbonIcons = require('@carbon/icons');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const sass = require("sass");

/** Create an HTML element from an object */
function createElement(obj) {
  const { elem, attrs, content } = obj;
  let htmlString = `<${elem}`; // Opening tag

  if (attrs) { // Add optional attributes
    for (const [key, value] of Object.entries(attrs)) {
      htmlString += ` ${key}="${value}"`;
    }
  }

  htmlString += ">";

  if (content) { // Add optional child elements
    content.forEach(child => {
      htmlString += createElement(child); // Recursive call for child elements
    });
  }

  htmlString += `</${elem}>`; // Closing tag

  return htmlString;
}

module.exports = function(eleventyConfig) {
  // Copy the `img` and `css` folders to the output
  // eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/img");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy({ "assets/img/favicon": "/" }); // Copy `img/favicon` to root

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addShortcode('icon', function (iconName, size) {
    const icon = CarbonIcons[iconName];
    return icon ? createElement(icon) : '';
  });

  eleventyConfig.addShortcode('tableOfContents', function (post) {
    if (post.indexOf('</h2>') === -1) return ''; // Check if post contains any `h2`s
    
    let tocHtml = `
      <div class="label-sm mar-btm-1 pad-top-1">Table of contents</div>
      <ul>
    `;

    const regex = /<h2[^>]*>(.*?)<\/h2>/g;
    while ((match = regex.exec(post)) !== null) {
      const withoutAnchor = match[1].replace(/<a[^>]*>.*?<\/a>/g, ""); // remove any <a> tags and their inner content
      const cleanText = withoutAnchor.replace(/<\/?[^>]+(>|$)/g, ""); // remove any remaining HTML tags
      
      tocHtml += `<li><a href="#${cleanText.trim().toLowerCase()}">${cleanText.trim()}</a></li>`;
    }

    tocHtml += '</ul>';

    return tocHtml;
  });

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  eleventyConfig.addFilter("getMorePosts", (collection, count, page) => {
    const postsExcludingCurrent = collection.filter((post) => post.template?.filePathStem !== page?.filePathStem);
    return postsExcludingCurrent.slice(0, count ?? 3);
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts", "projects"].indexOf(tag) === -1);
  }

  eleventyConfig.addFilter("filterTagList", filterTagList)

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "🔗",
      level: [1,2,3,4],
    }),
    slugify: eleventyConfig.getFilter("slug")
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/assets/css/**/*.css"
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
