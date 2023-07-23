import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv'
dotenv.config({ path: `.env.local` });

const API_URL = 'https://api.callbelva.com/transcriptions';
const HEADERS = { 'x-api-key':process.env.BELVA_AI_KEY , 'Content-Type': 'application/json' };

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { call_id } = req.query;
  if (!call_id || typeof call_id !== 'string') return res.status(400).json({ error: 'Invalid call_id provided.' });

  try {
    const response = await axios.post(API_URL, { call_id }, { headers: HEADERS });
    return res.status(200).json(response.data);
  } catch {
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};
