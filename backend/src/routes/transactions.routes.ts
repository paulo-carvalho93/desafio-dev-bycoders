import { Router } from 'express';
import multer from 'multer';

import UploadTransactionsController from '../controllers/UploadTransactionsController';

const transactionsRouter = Router();
const upload = multer();

const uploadTransactionsController = new UploadTransactionsController();

transactionsRouter.post(
  '/import',
  upload.single('file'),
  uploadTransactionsController.store,
);

export default transactionsRouter;
