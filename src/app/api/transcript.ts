// Import required modules
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Define your API handler route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // API endpoint URL
  const apiUrl: string = 'https://api.callbelva.com/transcriptions';

  // Get the call_id from the request query parameters
  const { call_id } = req.query;

  // Check if call_id is provided in the query parameters
  if (!call_id || typeof call_id !== 'string') {
    return res.status(400).json({ error: 'Invalid call_id provided.' });
  }

  // Request data
  const requestData = {
    call_id,
  };

  // Request headers
  const headers = {
    'x-api-key': 'APIKEY',
    'Content-Type': 'application/json',
  };

  try {
    // Make a POST request to the API endpoint
    const response = await axios.post(apiUrl, requestData, { headers });

    // Get the response data from the API and send it as the API response
    res.status(200).json(response.data);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ error: 'Something went wrong.' });
  }
}