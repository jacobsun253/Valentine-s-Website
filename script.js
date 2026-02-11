const music = document.getElementById("bgMusic");
const btn = document.getElementById("btn");
const container = document.querySelector(".container");

btn.addEventListener("click", function () {

  music.volume = 0.5;
  music.play();

  fadeOut(showIntroMessages);
});

/* ---------- INTRO MESSAGE SEQUENCE ---------- */

function showIntroMessages() {
  const messages = [
    "You make ordinary days feel special.",
    "I've never had to hide any part of myself near you.",
    "You’re truly one of my favorite people.",
    "Thank you for being one of my safe places."
  ];

  let index = 0;

  function showNext() {
    if (index >= messages.length) {
      fadeOut(showValentineQuestion);
      return;
    }

    container.innerHTML = `
      <div class="date-plan fade-in">
        <p id="typewriter" class="date-text"></p>
      </div>
    `;

    typeWriter(messages[index], "typewriter", 50);

    index++;

    setTimeout(() => {
      fadeOut(showNext);
    }, 6000); // 6 seconds per message
  }

  showNext();
}

/* ---------- VALENTINE QUESTION ---------- */

function showValentineQuestion() {
  container.innerHTML = `
    <div class="valentine fade-in">
      <h1 class="big-text">Will you be my Valentine? 💖</h1>
      <div class="choices">
        <button class="yes">Yes 💕</button>
        <button class="yes">Yes 💘</button>
      </div>
    </div>
  `;

  const yesButtons = document.querySelectorAll(".yes");
  yesButtons.forEach(button => {
    button.addEventListener("click", startCelebration);
  });
}

/* ---------- CELEBRATION ---------- */

function startCelebration() {
  fadeOut(() => {
    container.innerHTML = `
      <div class="celebration fade-in">
        <h1 class="big-text">YAYYY 💖</h1>
        <div class="flowers">🌸 🌷 🌹 🌺 🌼 🌻</div>
        <canvas id="confetti"></canvas>
      </div>
    `;

    launchConfetti();

    setTimeout(() => {
      fadeOut(showDate);
    }, 5000); // extended celebration
  });
}

/* ---------- FINAL DATE REVEAL ---------- */

function showDate() {
  container.innerHTML = `
    <div class="date-plan fade-in">
      <h1 class="big-text">Our Valentine's Day Date 💕</h1>
      <p id="typewriter" class="date-text"></p>
    </div>
  `;

  const text = `Movies at 3:00 PM 🍿
Dinner at Penang 🍜
A night together holding hands 🌙
And a day we'll never forget ❤️`;

  typeWriter(text, "typewriter", 45);
}

/* ---------- FADE FUNCTION ---------- */

function fadeOut(callback) {
  container.classList.remove("fade-in");
  container.classList.add("fade-out");

  setTimeout(() => {
    container.classList.remove("fade-out");
    callback();
  }, 600);
}

/* ---------- TYPEWRITER ---------- */

function typeWriter(text, elementId, speed) {
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

/* ---------- CONFETTI ---------- */

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const pieces = [];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;

      if (p.y > canvas.height) {
        p.y = 0;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}