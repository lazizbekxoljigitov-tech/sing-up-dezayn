// ===== ELEMENTLAR =====
const nameInput = document.createElement("input"); // agar name input qo‘shmoqchi bo‘lsang
const emailInput = document.createElement("input"); // agar email input qo‘shmoqchi bo‘lsang
const messageInput = document.querySelector(".input");
const sendBtn = document.querySelector(".subscribe__btn");

// ===== EVENT LISTER =====
sendBtn.addEventListener("click", sendMessage);

// ENTER bosganda ham yuborilsin
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ===== ASOSİY FUNKSIYA =====
async function sendMessage() {
  const message = messageInput.value.trim();

  // Xatolik tekshirish
  if (!message) {
    alert("❗ Iltimos xabar yozing");
    return;
  }

  try {
    // Fetch orqali backend ga yuborish
    const res = await fetch("/api/message", {
      // ❗ port ko‘rsatilmaydi, backend va frontend bir serverda bo‘lsa
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Foydalanuvchi", // hozir default, agar name input qo‘shilsa o‘sha qiymat
        email: "user@example.com", // hozir default, agar email input bo‘lsa o‘sha qiymat
        message: message,
      }),
    });

    if (!res.ok) throw new Error("Serverda xatolik yuz berdi");

    // Tozalash va alert
    messageInput.value = "";
    alert("✅ Xabar adminga yuborildi");
  } catch (err) {
    console.error(err);
    alert("❌ Xatolik yuz berdi");
  }
}

// CARD SLIDER
const track = document.querySelector(".cards__track");
const marquee = document.querySelector(".cards__marquee");

let speed = 1; // px per frame
let pos = 0;

// CARD elementlarini duplikatsiya qilish (smooth loop uchun)
track.innerHTML += track.innerHTML; // cards ni takrorlab qo'yamiz

function animateCards() {
  pos += speed;

  // agar scroll oxirga yetgan bo'lsa, boshlang'ich joyga qayt
  if (pos >= track.scrollWidth / 2) {
    pos = 0;
  }

  track.style.transform = `translateX(-${pos}px)`;
  requestAnimationFrame(animateCards);
}

// boshlash
animateCards();

// MOUSE OVER pause
marquee.addEventListener("mouseenter", () => (speed = 0));
marquee.addEventListener("mouseleave", () => (speed = 1));
// HERO MARQUEE SLIDER
const heroTrack = document.querySelector(".hero__track");
const heroMarquee = document.querySelector(".hero__marquee");

let heroSpeed = 1; // px per frame
let heroPos = 0;

// Hero cards duplikatsiya qilinadi (smooth loop uchun)
heroTrack.innerHTML += heroTrack.innerHTML; // elementlarni takrorlaymiz

function animateHero() {
  heroPos += heroSpeed;

  // Oxirga yetganda visual uzilishsiz boshidan boshlash
  if (heroPos >= heroTrack.scrollWidth / 2) {
    heroPos = 0;
  }

  heroTrack.style.transform = `translateX(-${heroPos}px)`;
  requestAnimationFrame(animateHero);
}

// Animatsiyani boshlash
animateHero();

// Mouse hover bo‘lsa to‘xtatish
heroMarquee.addEventListener("mouseenter", () => (heroSpeed = 0));
heroMarquee.addEventListener("mouseleave", () => (heroSpeed = 1));
