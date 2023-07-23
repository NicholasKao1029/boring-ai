import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const SPELL_ID = "OGBCi-Obpax64frQWBi0B"

type RequestBody = {
  phone_number: string;
  objective: string;
};

type RespellResponse = {
  outputs: {
    output: string;
  };
};

function parseChat(chat: string) {
  const lines = chat.split('\n');
  const parsed = lines.map(line => {
    const [speaker, ...msgArr] = line.split(': ');
    const msg = msgArr.join(': ');
    return { speaker, msg };
  });
  return parsed;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { phone_number, objective }: RequestBody = req.body;

    try {
        console.log(res)
      // const response = await axios.post<RespellResponse>('https://api.respell.ai/v1/run', 
      //   {
      //     spellId: SPELL_ID,
      //     inputs: {
      //       phone_number: phone_number,
      //       objective,
      //     }
      //   },
      //   {
      //     headers: {
      //       authorization: 'Bearer e7c093e8-2089-4861-ae48-f42e495b5008',
      //       accept: 'application/json',
      //       'content-type': 'application/json',
      //     },
      //   }
      // );

      // const { outputs } = response.data;
      // const parsedChat = parseChat(outputs.output);
      // res.status(200).json({chat: parsedChat});
      res.status(200).json({chat: ""});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
}
