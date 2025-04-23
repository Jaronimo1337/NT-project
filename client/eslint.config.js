import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig({
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      languageOptions: {
        globals: { ...globals.browser, ...globals.node },
      },
      rules: {
        "react/prop-types": "off", 
      },
    },
  ],
  extends: ["plugin:react/recommended"], 
});