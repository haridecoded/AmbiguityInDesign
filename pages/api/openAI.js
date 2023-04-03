const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7,
  });
  res.status(200).json({ data: completion.data.choices[0].text });
}

// export const generateCompletion = async (model, prompt) => {
//   const openai = new OpenAIApi(configuration);
//   const completion = await openai.createCompletion({
//     model: model,
//     prompt: prompt,
//     max_tokens: 1024,
//     n: 1,
//     stop: null,
//     temperature: 0.7,
//   });
//   return completion.data.choices[0].text;
// };

// export const generateImages = async (prompt) => {
//   const openai = new OpenAIApi(configuration);
//   const completion = await openai.createImage({
//     prompt: prompt,
//     size: "256x256",
//   });
//   console.log(completion.data.data[0].url);
//   return completion.data.data[0].url;
// };
