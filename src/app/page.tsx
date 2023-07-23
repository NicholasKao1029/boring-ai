import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {TextArea} from '@/components/ui/TextArea'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col space-y-4 lg:w-1/2 p-4">
          <Input placeholder="Phone Number" />
          <TextArea placeholder="Objective" />
        </div>
        <div className="flex lg:w-1/2 p-4 justify-end items-start">
          <Button>Add to List</Button>
        </div>
      </div>

      {/* Rest of your code here */}

    </main>
  )
}
