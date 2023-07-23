'use client'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import { useChat } from 'ai/react'
import axios from 'axios'

import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

interface ChatMsg {
    msg: string;
    speaker: "Human" | "AI"
}

const Transcript = ({transcripts}: {transcripts: ChatMsg[]}) => (
  <div>
    {transcripts.map((transcript, index) => (
      <p key={index} className={transcript.speaker}>
        {transcript.speaker}: {transcript.msg}
      </p>
    ))}
  </div>
);

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [objective, setObjective] = useState('')
  const [transcript, setTranscript] = useState<ChatMsg[]>([])

  const handleButtonClick = async () => {
    try {
        console.log(phoneNumber)
        console.log(objective)
      const response = await axios.post('/api/call', {
        phone_number: phoneNumber,
        objective,
      })

      if (response.data.chat) {
          console.log("success")
        setTranscript(response.data.chat)
      }
    } catch (error: any) {
      console.error('Failed to make call:', error)
    }
  }

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
            <Button onClick={handleButtonClick}>Give to Assistant</Button>
          </div>
        </div>
        <div className="flex flex-col space-y-1 lg:w-1/2">
          <h3 className="font-bold text-lg">Transcript</h3>
          <Transcript transcripts={transcript} />
        </div>
      </div>
    </main>
  )
}
