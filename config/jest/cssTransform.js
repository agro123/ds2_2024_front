"use strict";

export default {
  process(src, filename, config, options) {
    return {
      code: "module.exports = {};",
    };
  },
  getCacheKey() {
    return "cssTransform";
  },
};