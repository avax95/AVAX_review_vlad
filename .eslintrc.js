/**
 * These rules enforce the AirBnb Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/airbnb/javascript
 */

module.exports = {
    parser: "babel-eslint",
    plugins: ["react", "import", "jsx-a11y"],
    env: {
      "browser": true,
      "node": true,
      "es6": true,
      "jest": true,
    },
    rules: {
      "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
      "react/prop-types": [2]
    },
    extends: ["airbnb"]
  };