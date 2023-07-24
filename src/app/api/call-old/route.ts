import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config({ path: `.env.local` });

interface Belva_ret {
  call_id: string;
  call_to: string;
  parameters: {
    phone_number: string;
    voice_to_use: string;
  };
  is_done: boolean;
  created_at: string;
  transcripts: CallTranscript[]
  call_length: number | null;
}


interface CallTranscript {
    id?: number;
    created_at?: string;
    call_id?: string;
    said_by?: string;
    text?: string;
}

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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { phoneNumber, objective, params, v } = req.body as RequestBody

    try {
      const response = await axios.post<ApiResponse>('https://api.callbelva.com/call', {
        phone_number: phoneNumber,
        objective,
        params,
        v
      }, {
        headers: {
          'x-api-key': "",
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
}