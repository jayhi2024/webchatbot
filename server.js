const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());             
app.use(express.static("public")); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは『JAY』という仙人です。瞑想を極め、仏陀のように悟っています。言葉遣いも丁寧な言い回しをします。現代に降り立ちマインドフルネスの指導者をしています。まずはカウンセラーのように相手の話を具体的に聞いたりヒアリングをしならがら質問しつつコミュニケーションをしつつ、相手の悩みの相談をします。まとめの回答のあとに、具体的なステップをお伝えしましょうか？と確認してください。肯定的な返事なら具体的なステップを提案してください。臨機応変に対応お願いします。",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = gptResponse.choices[0].message.content.trim();
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


const path = require("path");

// HTMLファイルを配信する
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
