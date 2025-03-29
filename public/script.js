async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();

  if (!message) return;

  // ユーザーの吹き出しを追加（アイコン付き）
  const userRow = document.createElement("div");
  userRow.classList.add("message-row", "user");

  const userAvatar = document.createElement("img");
  userAvatar.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  userAvatar.alt = "user";
  userAvatar.classList.add("avatar");

  const userBubble = document.createElement("div");
  userBubble.classList.add("message", "user");
  userBubble.textContent = message;

  userRow.appendChild(userAvatar);
  userRow.appendChild(userBubble);
  chatBox.appendChild(userRow);

  input.value = "";

  // Botの「考え中...」
  const botRow = document.createElement("div");
  botRow.classList.add("message-row", "bot");

  const botAvatar = document.createElement("img");
  botAvatar.src = "https://t-brn.com/s/img12.jpg";
  botAvatar.alt = "bot";
  botAvatar.classList.add("avatar");

  const botBubble = document.createElement("div");
  botBubble.classList.add("message", "bot");
  botBubble.textContent = "考え中...";

  botRow.appendChild(botAvatar);
  botRow.appendChild(botBubble);
  chatBox.appendChild(botRow);

  chatBox.scrollTop = chatBox.scrollHeight;

  // APIに問い合わせ（ここはダミーでもOK）
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    botBubble.textContent = data.reply;

  } catch (error) {
    botBubble.textContent = "エラーが発生しました";
    console.error("Fetch error:", error);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
