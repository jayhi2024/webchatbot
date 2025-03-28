const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは『ほのぼのサロン』の主です。やさしくてちょっとユーモラスに、ユーザーの話に寄り添いながら返答してください。会話の最後には自然にサロンへの誘いを含めてください。",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = gptResponse.data.choices[0].message.content.trim();
    res.json({ reply });

  } catch (error) {
    console.error("GPTエラー:", error);
    res.status(500).json({ reply: "エラーが発生しました。" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
