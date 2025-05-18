import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";
import JSON5 from "json5";
import { traverseJsonNodes } from "vite-plugin-json-md";

import type { Plugin, ResolvedConfig } from "vite";

/**
 * Configuration options for the I18N-JSON-Markdown plugin
 */
export interface I18nJsonMdPluginOptions {
  sourceDir: string;
  outputDir: string;
  locales: string[];
  mode?: "dev" | "prod" | "both" | "off";
  minify?: boolean;
  outputFormat?: "json" | "json5" | "js";
  externalLinks?: boolean;
}

export function i18nJsonMdPlugin(options: I18nJsonMdPluginOptions): Plugin {
  const {
    sourceDir,
    outputDir,
    locales,
    mode = "both",
    minify = false,
    outputFormat = "json",
    externalLinks = false,
  } = options;

  let config: undefined | ResolvedConfig;

  return {
    name: "vite-plugin-i18n-json-md",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    buildStart() {
      if (
        mode !== "both" &&
        ((mode === "dev" && !config?.env.DEV) ||
          (mode === "prod" && !config?.env.PROD))
      ) {
        return;
      }

      locales.forEach((locale) => {
        handleLocale(locale);
      });
    },
  };

  function handleLocale(locale: string) {
    const localeDir = path.join(sourceDir, locale);
    const inputFiles = glob.sync(
      path.join(localeDir, "**/*.{json5,jsonc,json}"),
      { nodir: true },
    );

    // Combined object to store all parsed data
    const combinedParsedData: Record<string, any> = {};

    for (const filePath of inputFiles) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const parsedData = JSON5.parse(fileContent);

      // Recursively process markdown in the current file's data
      traverseJsonNodes(parsedData, localeDir, true, externalLinks);

      // Directly merge the parsed data into the combined object
      deepMerge(combinedParsedData, parsedData);
    }

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputDir), { recursive: true });

    // Write processed file
    const outputPath = path.join(outputDir, `${locale}.${outputFormat}`);
    if (outputFormat === "json") {
      fs.writeFileSync(
        outputPath,
        minify
          ? JSON.stringify(combinedParsedData)
          : JSON.stringify(combinedParsedData, null, 2),
      );
    } else if (outputFormat === "json5") {
      fs.writeFileSync(
        outputPath,
        minify
          ? JSON5.stringify(combinedParsedData)
          : JSON5.stringify(combinedParsedData, null, 2),
      );
    } else if (outputFormat === "js") {
      const exportObjectName = `${locale}Locale`;
      fs.writeFileSync(
        outputPath,
        `export const ${exportObjectName} = ${
          minify
            ? customStringify(combinedParsedData)
            : customStringify(combinedParsedData, 2)
        };\n` + `export default ${exportObjectName};\n`,
      );
    }
  }
}

// Deep merge utility function
function deepMerge(target: Record<string, any>, source: Record<string, any>) {
  for (const [key, value] of Object.entries(source)) {
    if (value instanceof Object && !Array.isArray(value)) {
      // If target doesn't have the key, create an empty object
      if (!target[key]) {
        target[key] = {};
      }

      // If target[key] is not an object, replace it with an empty object
      if (!(target[key] instanceof Object)) {
        target[key] = {};
      }

      // Recursively merge nested objects
      deepMerge(target[key], value);
    } else {
      // For non-object values, simply assign
      target[key] = value;
    }
  }
  return target;
}

// remove quotes from keys
function customStringify(obj: any, space?: number): string {
  return JSON.stringify(obj, (key, value) => value, space).replaceAll(
    /"([a-z_$][\w$]*)":/gi,
    "$1:",
  );
}
