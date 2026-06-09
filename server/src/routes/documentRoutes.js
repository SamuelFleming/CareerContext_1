// server/src/routes/documentRoutes.js

const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

router.get('/', documentController.listDocuments);
router.post('/', documentController.createDocument);

router.get('/:documentId', documentController.getDocumentById);
router.put('/:documentId', documentController.updateDocument);
router.delete('/:documentId', documentController.deleteDocument);

module.exports = router;