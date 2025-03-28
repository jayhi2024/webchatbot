async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();

  if (!message) return;

  // ユーザーの吹き出しを表示
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);

  // 入力リセット
  input.value = "";

  // Botの吹き出し（仮：読み込み中）
  const botMessage = document.createElement("div");
  botMessage.className = "message bot";
  botMessage.textContent = "考え中……";
  chatBox.appendChild(botMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    botMessage.textContent = data.reply;
  } catch (error) {
    botMessage.textContent = "エラーが発生しました🥲";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
