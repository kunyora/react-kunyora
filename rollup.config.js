import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.js",
  external: ["react", "kunyora"],
  output: {
    format: "umd",
    name: "ReactKunyora",
    globals: {
      react: "React",
      kunyora: "kunyoraClient"
    }
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: "node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs()
  ]
};

if (env === "production") {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
