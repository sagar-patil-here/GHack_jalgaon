import express from "express";
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import prescriptionRoutes from './routes/prescriptionRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for AI-heavy endpoints
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 20, 
  message: { success: false, message: 'Upload limit exceeded. Try again in 1 hour.' },
});

app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/prescriptions', uploadLimiter, prescriptionRoutes);



export default app;

