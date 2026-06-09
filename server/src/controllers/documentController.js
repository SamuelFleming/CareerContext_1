// server/src/controllers/documentController.js

const { notImplemented } = require('../utils/notImplemented');

const listDocuments = notImplemented(
  'GET /api/documents',
  'List saved or generated documents, optionally filtered by opportunity or type'
);

const createDocument = notImplemented(
  'POST /api/documents',
  'Create a new document manually or save a generated report'
);

const getDocumentById = notImplemented(
  'GET /api/documents/:documentId',
  'Load one document by id'
);

const updateDocument = notImplemented(
  'PUT /api/documents/:documentId',
  'Update document content, title, type, or status'
);

const deleteDocument = notImplemented(
  'DELETE /api/documents/:documentId',
  'Delete or archive a document'
);

module.exports = {
  listDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
};