// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require("@dhis2/cli-style");

module.exports = {
  extends: [config.eslintReact, "plugin:@typescript-eslint/recommended"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": "error",
    "import/extensions": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
