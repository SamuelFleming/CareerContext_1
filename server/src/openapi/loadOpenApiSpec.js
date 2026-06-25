// server/src/openapi/loadOpenApiSpec.js

const fs = require('fs');
const path = require('path');

const OPENAPI_DIR = __dirname;
const PATHS_DIR = path.join(OPENAPI_DIR, 'paths');

/**
 * Merge openapi.base.json with path fragments from paths/*.json.
 * Only non-underscore JSON files are loaded; each fragment may be
 * { "paths": { ... } } or a flat paths object.
 */
function loadOpenApiSpec() {
  const basePath = path.join(OPENAPI_DIR, 'openapi.base.json');

  if (!fs.existsSync(basePath)) {
    throw new Error(`OpenAPI base spec not found: ${basePath}`);
  }

  let base;
  try {
    base = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  } catch (err) {
    throw new Error(`Failed to parse OpenAPI base spec: ${err.message}`);
  }

  const mergedPaths = {};

  if (!fs.existsSync(PATHS_DIR)) {
    return { ...base, paths: mergedPaths };
  }

  const fragmentFiles = fs
    .readdirSync(PATHS_DIR)
    .filter((file) => file.endsWith('.json') && !file.startsWith('_'))
    .sort();

  for (const file of fragmentFiles) {
    const fragmentPath = path.join(PATHS_DIR, file);
    let fragment;

    try {
      fragment = JSON.parse(fs.readFileSync(fragmentPath, 'utf8'));
    } catch (err) {
      throw new Error(`Failed to parse OpenAPI path fragment ${file}: ${err.message}`);
    }

    const paths = fragment.paths ?? fragment;

    if (!paths || typeof paths !== 'object' || Array.isArray(paths)) {
      throw new Error(
        `OpenAPI path fragment ${file} must be { "paths": { ... } } or a paths object`
      );
    }

    for (const [routePath, operations] of Object.entries(paths)) {
      if (mergedPaths[routePath]) {
        throw new Error(
          `Duplicate OpenAPI path "${routePath}" in fragment ${file} (already defined in an earlier fragment)`
        );
      }
      mergedPaths[routePath] = operations;
    }
  }

  return { ...base, paths: mergedPaths };
}

module.exports = loadOpenApiSpec;
