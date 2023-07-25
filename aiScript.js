import {config} from "dotenv"
config()
import readline from "readline"
import {Configuration, OpenAIApi} from "openai"

const openai = new OpenAIApi( new Configuration({
    apiKey: process.env.API_KEY,
  })
);

console.log(process.env.API_URL)

const userInterface = readline.createInterface ({
    input: process.stdin,
    output: process.stdout
})

userInterface.prompt()
userInterface.on("line", async input => {
    const res = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    console.log(res.data.choices[0].message.content);
    userInterface.prompt()
})
