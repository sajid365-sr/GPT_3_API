/** @format */

require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
let cors = require("cors");


app.use(express.json());
app.use(cors());


/* ================ default route ================ */
app.get("/", (req, res) => {
  res.send("GPT_3 API running");
});



const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/gpt", async (req, res) => {

    const prompt = req.body.prompt;
    

   const response = await openai.createCompletion({
     model: "text-davinci-003",
     prompt: prompt,
     max_tokens: 2048,
     temperature: 0.7,
   });

    res.send({ result: response.data.choices[0].text });
  
});

// const runPrompt = async (prompt) => {
    
//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: prompt,
//         max_tokens: 2048,
//         temperature: 0.7  
//     })

//     return(response.data.choices[0].text);
// }


app.listen(port, () => {
    console.log('listening on port', port);
})


