import { Router } from 'express';
import * as prescriptionController from '../controllers/prescriptionController';
import { upload } from '../services/uploadService';

const router = Router();

router.post('/upload', upload.single('prescription'), prescriptionController.uploadPrescription);
router.get('/userPrescriptions', prescriptionController.getUserPrescriptions);
router.put('/:id/verify', prescriptionController.verifyPrescription);
router.put('/:id/reject', prescriptionController.rejectPrescription);
router.post('/:id/translate', prescriptionController.translatePrescription);

export default router;
