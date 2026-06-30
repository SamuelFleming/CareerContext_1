// server/src/config/swagger.js

const swaggerUi = require('swagger-ui-express');
const loadOpenApiSpec = require('../openapi/loadOpenApiSpec');

function isSwaggerEnabled() {
  if (process.env.SWAGGER_ENABLED === 'false') {
    return false;
  }

  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  return true;
}

/**
 * Mount Swagger UI and raw OpenAPI JSON when enabled.
 * UI: GET /api/docs
 * Spec: GET /api/docs/openapi.json
 */
function mountSwagger(app) {
  if (!isSwaggerEnabled()) {
    return;
  }

  const spec = loadOpenApiSpec();

  app.get('/api/docs/openapi.json', (req, res) => {
    res.json(spec);
  });

  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(spec, {
      customSiteTitle: 'CareerContext API',
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );
}

module.exports = {
  mountSwagger,
  isSwaggerEnabled,
  loadOpenApiSpec,
};
