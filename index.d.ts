declare module "vite-plugin-i18n-json-md" {
  import type { Plugin } from "vite";

  /**
   * Configuration options for the I18N-JSON-Markdown plugin
   * 
   * @property {string} sourceDir - The directory where the source files are located.
   * @property {string} outputDir - The directory where the output files will be generated.
   * @property {string[]} locales - An array of locale strings, e.g. ["en", "es", "zh-CN"]. They are subdirectories of the sourceDir.
   * @property {"dev" | "prod" | "both" | "off"} [mode] - The mode in which the plugin operates. Default is "both".
   * @property {boolean} [minify] - Whether to minify the output files. Default is false.
   * @property {"json" | "json5" | "js"} [outputFormat] - The format of the output files. Default is "json".
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

  /**
   * Creates a Vite plugin for processing I18N JSON Markdown files.
   * @param {I18nJsonMdPluginOptions} options - The configuration options for the plugin.
   * @returns {Plugin} - The Vite plugin instance.
   */
  export function i18nJsonMdPlugin(options: I18nJsonMdPluginOptions): Plugin;
} 