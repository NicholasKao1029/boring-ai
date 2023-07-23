import axios from 'axios'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, objective, params, v } = req.body

    try {
      const response = await axios.post('API_ENDPOINT_HERE', {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

