# vite-plugin-i18n-json-md

## Overview

`vite-plugin-i18n-json-md` is a Vite plugin that significantly facilitates the internationalization of an application. It allows translating text in JSON5 and Markdown formats into the standard JSON format for i18n files.

This simplifies the process of translating text and enhances collaboration between developers and translators.

Using AI to translate these text files accelerates the translation process and improves the quality of translations without the need for additional tools.


## Features

- **JSON5 Support**: Use JSON5 for your translation files, allowing for comments and more readable syntax.
- **Markdown Integration**: Write translations in Markdown, making it easier to handle complex text formatting.
- **Automatic Compilation**: Automatically compile your JSON5 and Markdown files into standard JSON files for use in your application.
- **Vite Integration**: Seamlessly integrates with Vite, ensuring fast and efficient builds.

## Installation

To install the plugin, use npm, yarn, or pnpm:

```shell
npm install vite-plugin-i18n-json-md --save-dev
```

```shell
yarn add vite-plugin-i18n-json-md --dev
```

```shell
pnpm add vite-plugin-i18n-json-md --dev
```

## Configuration Options

The plugin provides comprehensive configuration options to customize your internationalization workflow:

### `sourceDir` (Required)
- **Type**: `string`
- **Description**: The directory where your source translation files are located.
- **Example**: `'src/locales'`

### `outputDir` (Required)
- **Type**: `string`
- **Description**: The directory where compiled translation files will be generated.
- **Example**: `'src/assets/i18n'`

### `locales` (Required)
- **Type**: `string[]`
- **Description**: An array of locale strings to process. These are treated as subdirectories within the `sourceDir`.
- **Example**: `['en', 'es', 'zh-CN']`

### `mode` (Optional)
- **Type**: `"dev" | "prod" | "both" | "off"`
- **Default**: `"both"`
- **Description**: Determines in which environment the plugin operates.
  - `"dev"`: Only active during development
  - `"prod"`: Only active during production build
  - `"both"`: Active in both development and production
  - `"off"`: Plugin is disabled

### `minify` (Optional)
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to minify the output translation files.

### `outputFormat` (Optional)
- **Type**: `"json" | "json5" | "js"`
- **Default**: `"json"`
- **Description**: The format of the generated translation files.

## Configuration Example

Here's a configuration example:

```javascript
import { defineConfig } from 'vite';
import { jsonMdPlugin } from 'vite-plugin-i18n-json-md';

export default defineConfig({
  plugins: [
    jsonMdPlugin({
      sourceDir: 'src/locales',
      outputDir: 'src/assets/i18n',
      locales: ['en', 'fr', 'es'],
      mode: 'both',
      minify: true,
      outputFormat: 'json'
    })
  ]
});
```

## Markdown Processing Options

The plugin supports two main ways of processing markdown:

### 1. Inline Markdown

Use the `md:` prefix to process inline markdown directly in your JSON5 files:

```json5
{
  "welcome": {
    "title": "md:# Welcome to our platform",
    "description": "md:We offer:\n\n- Feature One\n- Feature Two\n- Feature Three"
  }
}
```

### 2. External Markdown Files

Use the `md:@` prefix to include external markdown files. Can use subdirectories:

```json5
{
  "welcome": {
    // Will look for `src/locales/en/legal/privacy-policy.md` if sourceDir is `src/locales` and locale is `en`
    "privacyPolicy": "md:@legal/privacy-policy.md"
  }
}
```

## Example: From JSON5 files with External Markdown to a formatted JSON

### Input Files

#### `src/locales/en/welcome.json5`
```json5
{
  // Welcome section with markdown formatting and external markdown
  "title": "md:# Welcome to **Our Platform**",
  "subtitle": "md:Discover *amazing* features and possibilities",
  "features": "md:@md/features.md",
  "description": "A comprehensive platform for modern developers",
  "callToAction": {
    "text": "md:**[Get Started Now →](https://example.com/signup)**",
    "style": "primary"
  }
}
```

#### `src/locales/en/user.json5`
```json5
{
  // User-related messages with mixed content
  "greeting": "Hello, {name}!",
  "profile": {
    "complete_profile": "md:*Complete your profile* to unlock **all features**"
  }
}
```

#### External Markdown File: `src/locales/en/md/features.md`
```markdown
## Our Key Features

- 🚀 High Performance Rendering
- 💡 Innovative Design Patterns
- 🔒 Advanced Security Protocols
- 🌐 Multi-language Support
- ⚡ Lightning Fast Compilation
```

### Output: `en.json`
```json
{
  "title": "<h1>Welcome to <strong>Our Platform</strong></h1>",
  "subtitle": "<p>Discover <em>amazing</em> features and possibilities</p>",
  "features": "<h2>Our Key Features</h2>\n<ul>\n<li>🚀 High Performance Rendering</li>\n<li>💡 Innovative Design Patterns</li>\n<li>🔒 Advanced Security Protocols</li>\n<li>🌐 Multi-language Support</li>\n<li>⚡ Lightning Fast Compilation</li>\n</ul>",
  "description": "A comprehensive platform for modern developers",
  "callToAction": {
    "text": "<p><strong><a href=\"https://example.com/signup\">Get Started Now →</a></strong></p>",
    "style": "primary"
  },
  "greeting": "Hello, {name}!",
  "profile": {
    "complete_profile": "<p><em>Complete your profile</em> to unlock <strong>all features</strong></p>"
  }
}
```

### External Markdown Benefits
- Separate complex content into dedicated markdown files
- Easy translate the markdown files using AI tools
- Keep translations organized and modular

## Best Practices

1. Use `md:` prefix for markdown content
2. Combine plain text and markdown seamlessly
3. Leverage HTML formatting for rich translations
4. Keep translations readable and maintainable


## License

MIT License
