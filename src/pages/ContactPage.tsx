import { CoffeeIcon } from "lucide-react";
import { useState } from "react"


export default function () {
  const [formValue, setFormValue] = useState<string | undefined>("");
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="p-6 rounded-md border border-accent bg-accent/5 dark:bg-accent/10">
        <h1 className="font-bold text-2xl flex gap-2 items-center"><CoffeeIcon className="w-8 h-8 stroke-2 coffee" /> Feedback!</h1>
        <div className="flex flex-col">
          <textarea
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Send us your valuable feedback on how we can improve"
            name="feedback"
            className="p-4 border border-accent/40 outline-0 focus:outline-1 focus:outline-accent/80 rounded-md my-4"
            cols={64}
            rows={8}
          />
          <button className="bg-gradient-to-br from-pink-400 via-teal-400 to-purple-400 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 px-2 py-1 rounded-md font-medium text-md  ">
            Send Feedback!
          </button>
        </div>
      </div>
    </div>
  )
}
