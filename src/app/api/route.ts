import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

interface RequestBody {
  phoneNumber: string;
  objective: string;
  params: Record<string, string>;
  v: number;
}

interface ApiResponse {
  status: string;
  call_id: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, objective, params, v } = req.body as RequestBody

    try {
      const response = await axios.post<ApiResponse>('https://api.callbelva.com/call', {
        phone_number: phoneNumber,
        objective,
        params,
        v
      }, {
        headers: {
          'x-api-key': process.env.BELVA_AI_KEY,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.data.status === 'success') {
        res.status(200).json({ call_id: response.data.call_id })
      } else {
        res.status(400).json({ error: 'Failed to make call' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
