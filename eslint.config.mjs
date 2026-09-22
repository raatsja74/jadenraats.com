import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      ".claude/**",
      ".agents/**",
      ".remember/**",
      "output/**",
      "Inbox/**",
      "Library/**",
      "node_modules/**",
      "public/**",
    ],
  },
];

export default eslintConfig;
