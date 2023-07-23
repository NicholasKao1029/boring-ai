'use client'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import { useState } from 'react'

import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

export default function Home() {

  const [phoneNumber, setPhoneNumber] = useState('')
  const [objective, setObjective] = useState('')
  const [transcript, setTranscript] = useState('')

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl font-mono text-sm lg:flex flex-col space-y-4">
          <div className="flex lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col space-y-4 lg:w-1/2">
              <Input 
                placeholder="Phone Number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
              />
              <Textarea 
                placeholder="Objective" 
                value={objective} 
                onChange={(e) => setObjective(e.target.value)} 
              />
            </div>
            <div className="flex lg:w-1/2 justify-end items-start">
              <Button>Give to Assistant</Button>
            </div>
          </div>
          <div className="flex flex-col space-y-1 lg:w-1/2">
            <h3 className="font-bold text-lg">Transcript</h3>
            <Textarea 
              placeholder="Transcript" 
              readOnly 
              value={transcript}
            />
          </div>
        </div>
      </main>
  )
}
