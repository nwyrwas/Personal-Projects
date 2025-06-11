const chatForm = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userInput = document.getElementById("user-input").value;
    chatBox.innerHTML += `<div><b>You:</b> ${userInput}</div>`;
    document.getElementById("user-input").value = "";

    const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user123", message: userInput })
    });

    const data = await res.json();
    chatBox.innerHTML += `<div><b>Bot:</b> ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});
