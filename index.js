import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Create new referral
app.post('/api/referrals', async (req, res) => {
  try {
    const {
      referrerName,
      referrerEmail,
      refereeName,
      refereeEmail,
      courseId,
      courseName
    } = req.body;

    // Validate required fields
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !courseId || !courseName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create referral in database
    const referral = await prisma.referral.create({
      data: {
        referrerId: Math.random().toString(36).substr(2, 9),
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        courseId,
        courseName
      }
    });

    // Return success response
    res.json({ 
      success: true, 
      message: 'Referral created successfully',
      data: referral 
    });

  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Failed to create referral' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});