import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config({ path: `.env.local` });

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

export async function POST(req: Request) {
    const { phone_number, objective }: RequestBody = await req.json();

    try {
        console.log("starting")
      const response = await axios.post<RespellResponse>('https://api.respell.ai/v1/run', 
        {
          spellId: SPELL_ID,
          inputs: {
            phone_number: phone_number,
            objective,
          }
        },
        {
          headers: {
            authorization: `Bearer ${process.env.RESPELL_KEY}`,
            accept: 'application/json',
            'content-type': 'application/json',
          },
        }
      );

      const { outputs } = response.data;
      const parsedChat = parseChat(outputs.output);
      return NextResponse.json({chat: parsedChat});
    } catch (error: any) {
      return NextResponse.json({error: true})
    }
}
