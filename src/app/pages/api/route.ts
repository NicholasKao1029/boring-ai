import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

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

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { phoneNumber, objective, params, v } = req.body as RequestBody

    try {
      const response = await axios.post<ApiResponse>('API_ENDPOINT_HERE', {
        phone_number: phoneNumber,
        objective,
        params,
        v
      }, {
        headers: {
          'x-api-key': 'your-api-key-here',
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
