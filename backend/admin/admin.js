async function loadMessages() {
  try {
    const res = await fetch("http://localhost:5000/api/admin/messages");
    const data = await res.json();

    const box = document.getElementById("messages");
    box.innerHTML = "";

    if (data.length === 0) {
      box.innerHTML =
        "<p style='color:white;text-align:center'>Xabarlar yo‘q</p>";
      return;
    }

    data.forEach((item) => {
      box.innerHTML += `
        <div class="msg">
          <p>${item.message}</p>
          <div class="time">${item.time}</div>
        </div>
      `;
    });
  } catch (e) {
    console.error(e);
  }
}

loadMessages();
setInterval(loadMessages, 3000);
