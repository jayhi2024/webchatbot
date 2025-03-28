async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();

  if (!message) return;

  // ユーザーの吹き出しを追加
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);

  // 入力欄をクリア
  input.value = "";

  // Botの仮メッセージ
  const botMessage = document.createElement("div");
  botMessage.className = "message bot";
  botMessage.textContent = "考え中...";
  chatBox.appendChild(botMessage);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    botMessage.textContent = data.reply;

  } catch (error) {
    botMessage.textContent = "エラーが発生しました";
    console.error("Fetch error:", error);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
