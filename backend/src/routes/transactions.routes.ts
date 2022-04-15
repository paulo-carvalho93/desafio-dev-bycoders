import { Router } from 'express';
import multer from 'multer';
import TransactionsController from '../controllers/TransactionsController';
import UploadTransactionsController from '../controllers/UploadTransactionsController';

const transactionsRouter = Router();
const upload = multer();

const transactionsContoller = new TransactionsController();
const uploadTransactionsController = new UploadTransactionsController();

transactionsRouter.post(
  '/import',
  upload.single('file'),
  uploadTransactionsController.store,
);
transactionsRouter.get('/', transactionsContoller.index);

export default transactionsRouter;
