# vite-plugin-i18n-json-md

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md) | [ru Russian](README.ru.md)

## Descripción general

`vite-plugin-i18n-json-md` es un complemento de Vite que facilita significativamente la internacionalización de una aplicación. Permite traducir texto en formatos JSON5 y Markdown al formato JSON estándar para archivos de internacionalización.

Esto simplifica el proceso de traducción de texto y mejora la colaboración entre desarrolladores y traductores.

Usar IA para traducir estos archivos de texto acelera el proceso de traducción y mejora la calidad de las traducciones sin necesidad de herramientas adicionales.

## Características

- **Soporte de JSON5**: Utilice JSON5 para archivos de traducción, lo que permite agregar comentarios y hace la sintaxis más legible.
- **Integración de Markdown**: Escriba traducciones en Markdown, facilitando el manejo de formateo de texto complejo.
- **Compilación Automática**: Compile automáticamente sus archivos JSON5 y Markdown en archivos JSON estándar para usar en su aplicación.
- **Integración con Vite**: Se integra fácilmente con Vite, proporcionando compilaciones rápidas y eficientes.

## Instalación

Para instalar el complemento, use npm, yarn o pnpm:

```shell
npm install vite-plugin-i18n-json-md --save-dev
```

```shell
yarn add vite-plugin-i18n-json-md --dev
```

```shell
pnpm add vite-plugin-i18n-json-md --dev
```

## Opciones de Configuración

El complemento proporciona opciones de configuración completas para personalizar su flujo de trabajo de internacionalización:

### `sourceDir` (Obligatorio)
- **Tipo**: `string`
- **Descripción**: Directorio donde se encuentran los archivos de traducción de origen.
- **Ejemplo**: `'src/locales'`

### `outputDir` (Obligatorio)
- **Tipo**: `string`
- **Descripción**: Directorio donde se generarán los archivos de traducción compilados.
- **Ejemplo**: `'src/assets/i18n'`

### `locales` (Obligatorio)
- **Tipo**: `string[]`
- **Descripción**: Matriz de cadenas de configuración regional para procesar. Se tratan como subdirectorios dentro de `sourceDir`.
- **Ejemplo**: `['en', 'es', 'zh-CN']`

### `mode` (Opcional)
- **Tipo**: `"dev" | "prod" | "both" | "off"`
- **Por defecto**: `"both"`
- **Descripción**: Determina en qué entorno opera el complemento.
  - `"dev"`: Activo solo durante el desarrollo
  - `"prod"`: Activo solo durante la compilación de producción
  - `"both"`: Activo en desarrollo y producción
  - `"off"`: Complemento desactivado

### `minify` (Opcional)
- **Tipo**: `boolean`
- **Por defecto**: `false`
- **Descripción**: Si se deben minimizar los archivos de traducción de salida.

### `outputFormat` (Opcional)
- **Tipo**: `"json" | "json5" | "js"`
- **Por defecto**: `"json"`
- **Descripción**: Formato de los archivos de traducción generados.

## Ejemplo de Configuración

Aquí hay un ejemplo de configuración:

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

## Opciones de Procesamiento de Markdown

El complemento admite dos formas principales de procesar markdown:

### 1. Markdown Integrado

Use el prefijo `md:` para procesar markdown integrado directamente en archivos JSON5:

```json5
{
  "welcome": {
    "title": "md:# Bienvenido a nuestra plataforma",
    "description": "md:Ofrecemos:\n\n- Característica Uno\n- Característica Dos\n- Característica Tres"
  }
}
```

### 2. Archivos Markdown Externos

Use el prefijo `md:@` para incluir archivos markdown externos. Se pueden usar subdirectorios:

```json5
{
  "welcome": {
    // Buscará `src/locales/en/legal/privacy-policy.md` si sourceDir es `src/locales` y la configuración regional es `en`
    "privacyPolicy": "md:@legal/privacy-policy.md"
  }
}
```

## Ejemplo: De archivos JSON5 con Markdown externo a JSON formateado

### Archivos de Entrada

#### `src/locales/en/welcome.json5`
```json5
{
  // Sección de bienvenida con formato markdown y markdown externo
  "title": "md:# Bienvenido a **Nuestra Plataforma**",
  "subtitle": "md:Descubre posibilidades *increíbles*",
  "features": "md:@md/features.md",
  "description": "Una plataforma integral para desarrolladores modernos",
  "callToAction": {
    "text": "md:**[Comenzar Ahora →](https://example.com/signup)**",
    "style": "primary"
  }
}
```

#### `src/locales/en/user.json5`
```json5
{
  // Mensajes relacionados con el usuario
  "greeting": "¡Hola, {name}!",
  "profile": {
    "complete_profile": "md:*Completa tu perfil* para desbloquear **todas las características**"
  }
}
```

#### Archivo Markdown Externo: `src/locales/en/md/features.md`
```markdown
## Nuestras Características Clave

- 🚀 Renderizado de Alto Rendimiento
- 💡 Patrones de Diseño Innovadores
- 🔒 Protocolos de Seguridad Avanzados
- 🌐 Soporte Multilenguaje
- ⚡ Compilación Ultrarrápida
```

### Salida: `en.json`
```json
{
  "title": "<h1>Bienvenido a <strong>Nuestra Plataforma</strong></h1>",
  "subtitle": "<p>Descubre posibilidades <em>increíbles</em></p>",
  "features": "<h2>Nuestras Características Clave</h2>\n<ul>\n<li>🚀 Renderizado de Alto Rendimiento</li>\n<li>💡 Patrones de Diseño Innovadores</li>\n<li>🔒 Protocolos de Seguridad Avanzados</li>\n<li>🌐 Soporte Multilenguaje</li>\n<li>⚡ Compilación Ultrarrápida</li>\n</ul>",
  "description": "Una plataforma integral para desarrolladores modernos",
  "callToAction": {
    "text": "<p><strong><a href=\"https://example.com/signup\">Comenzar Ahora →</a></strong></p>",
    "style": "primary"
  },
  "greeting": "¡Hola, {name}!",
  "profile": {
    "complete_profile": "<p><em>Completa tu perfil</em> para desbloquear <strong>todas las características</strong></p>"
  }
}
```

### Beneficios de Markdown Externo
- Separar contenido complejo en archivos markdown dedicados
- Traducir fácilmente archivos markdown con herramientas de IA
- Organización y modularidad de traducciones

## Mejores Prácticas

1. Use el prefijo `md:` para contenido markdown
2. Combine texto plano y markdown
3. Utilice formato HTML para traducciones enriquecidas
4. Mantenga la legibilidad y la facilidad de mantenimiento de las traducciones

## Licencia

Licencia MIT 