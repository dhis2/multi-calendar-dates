module.exports = {
  default: [
    "--require-module ts-node/register",
    "--import features/**/*.ts",
    "--publish-quiet",
  ].join(" "),
};
