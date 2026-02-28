import { Router } from 'express';
import * as prescriptionController from '../controllers/prescriptionController';
import { upload } from '../services/uploadService';

const router = Router();

router.post('/upload', upload.single('prescription'), prescriptionController.uploadPrescription);

export default router;
