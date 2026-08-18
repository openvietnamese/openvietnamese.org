module.exports = function (eleventyConfig) {
  // ── Passthrough: copy assets unchanged ─────────────────────────
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  // UNC Viet materials: course pages are built from templates, but static
  // files dropped alongside them (PDFs, slides, audio, images) pass through
  // untouched — no templating.
  eleventyConfig.addPassthroughCopy("src/uncviet/**/*.pdf");
  eleventyConfig.addPassthroughCopy("src/uncviet/**/*.{png,jpg,jpeg,gif,svg,webp}");
  eleventyConfig.addPassthroughCopy("src/uncviet/**/*.{mp3,mp4,wav}");
  eleventyConfig.addPassthroughCopy("src/uncviet/**/*.{docx,pptx,xlsx}");

  // ── Ignore draft and source folders entirely ────────────────────
  eleventyConfig.ignores.add("_drafts/**");
  eleventyConfig.ignores.add("_source/**");

  // ── Sections not yet ready for public launch ─────────────────────
  // Only the homepage and UNC Viet are public for now. Source stays in
  // the repo (and still builds locally with `--input=src` overrides if
  // needed) — these three are just excluded from the deployed site.
  eleventyConfig.ignores.add("src/taskbook/**");
  eleventyConfig.ignores.add("src/read/**");
  eleventyConfig.ignores.add("src/exam/**");

  // ── Filters ─────────────────────────────────────────────────────
  eleventyConfig.addFilter("slug", (str) =>
    (str || "").toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
  );
  eleventyConfig.addFilter("truncate", (str, len = 60) =>
    str && str.length > len ? str.slice(0, len) + "…" : str
  );

  // ── Section tag: inject active section into data ─────────────────
  // Each section folder has a directory data file (e.g. taskbook/taskbook.json)
  // that sets { section: "taskbook" } — picked up automatically by Eleventy.

  return {
    dir: {
      input:    "src",
      output:   "_site",
      includes: "_includes",
      data:     "_data",
    },
    templateFormats:      ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine:   "njk",
  };
};
