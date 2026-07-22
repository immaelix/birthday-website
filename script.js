/**

 * Assets — drop files in folders, then list names below.

 */



const PHOTO_FILES = [
  "IMG-20260103-WA0361.jpg",
  "IMG-20260103-WA0373.jpg",
  "IMG-20260103-WA0381.jpg",
  "IMG-20260103-WA0409.jpg",
  "IMG-20260304-WA0023.jpg",
  "IMG-20260719-WA0012.jpg",
  "IMG-20260719-WA0051.jpg",
  "IMG-20260719-WA0052.jpg",
  "1968495937213137.jpg",
  "Screenshot_20251127_163725_com.roblox.client.jpg",
  "Snapchat-1414954007.jpg",
];



const STICKER_FILES = [

  // "heart.png",

];



/**

 * Intro copy — default is placeholder #1 until you pick a number.

 * Tell me: "use intro 3" (etc.) and we'll set INTRO_ACTIVE.

 */

const INTROS = {

  1: {

    eyebrow: "just for you",

    title: "Happy birthday, my love",

    subtitle: "I made you something small. No rush — take your time opening it.",

    hint: "tap anywhere when you're ready",

  },

  2: {

    eyebrow: "today is yours",

    title: "Hey, birthday girl",

    subtitle: "Before the chaos, the cake, and the texts — I wanted you alone with this for a minute.",

    hint: "soft tap to start",

  },

  3: {

    eyebrow: "a little secret",

    title: "You first. Always you.",

    subtitle: "This isn't a generic card. It's us — the quiet parts and the loud ones.",

    hint: "open when your heart's unclenched",

  },

  4: {

    eyebrow: "24 hours of you",

    title: "Happy birthday, beautiful",

    subtitle: "I thought about what to say. Then I decided to show you instead.",

    hint: "keep going — gently",

  },

  5: {

    eyebrow: "from me to you",

    title: "The world can wait today",

    subtitle: "Close the door in your head for a second. What's here is only for you.",

    hint: "tap to step inside",

  },

  6: {

    eyebrow: "plot twist",

    title: "It starts sweet. Promise.",

    subtitle: "I won't spoil where this goes. You'll feel it when we get there.",

    hint: "trust me — tap",

  },

  7: {

    eyebrow: "remember this",

    title: "Another year of you",

    subtitle: "Same person I fall for on repeat — today I tried to put that in pixels.",

    hint: "begin",

  },

  8: {

    eyebrow: "hi, stunner",

    title: "You woke up older. I woke up luckier.",

    subtitle: "Let this unfold slow. The ending is… very on-brand for us.",

    hint: "tap if you're curious",

  },

};



const INTRO_ACTIVE = 6;

const COPY = {
  memoriesLead: "Some of my favorite proof that you're real.",
  surpriseTitle: "Okay… now",
  surpriseLead: "You knew we weren't stopping at cute.",
};

// Customize your letter here!
const LETTER_CONTENT = `
Only spicy and intense stuff here... 😏
I love you more than words can say,
and I can't wait to spend more birthdays with you.
You're my everything, my love.
`;

const THEME_BY_SCREEN = {
  intro: "calm",
  memories: "warm",
  surprise: "spicy",
  cake: "spicy",
  letter: "spicy"
};



const audio = document.getElementById("bg-music");

const musicToggle = document.getElementById("music-toggle");

const gallery = document.getElementById("gallery");

const stickersLayer = document.getElementById("stickers");

const intro = document.getElementById("intro");

const toSurprise = document.getElementById("to-surprise");



function setTheme(theme) {

  document.body.dataset.theme = theme;

}



function applyIntro() {

  const copy = INTROS[INTRO_ACTIVE] || INTROS[1];

  const eyebrow = document.getElementById("intro-eyebrow");

  const title = document.getElementById("intro-title");

  const subtitle = document.getElementById("intro-subtitle");

  const hint = document.getElementById("intro-hint");



  if (eyebrow) eyebrow.textContent = copy.eyebrow;

  if (title) title.textContent = copy.title;

  if (subtitle) subtitle.textContent = copy.subtitle;

  if (hint) hint.textContent = copy.hint;



  const memoriesLead = document.getElementById("memories-lead");

  const surpriseTitle = document.getElementById("surprise-title");

  const surpriseLead = document.getElementById("surprise-lead");

  if (memoriesLead) memoriesLead.textContent = COPY.memoriesLead;

  if (surpriseTitle) surpriseTitle.textContent = COPY.surpriseTitle;

  if (surpriseLead) surpriseLead.textContent = COPY.surpriseLead;

}



function initMusic() {

  if (!audio || !musicToggle) return;



  musicToggle.addEventListener("click", async () => {

    try {

      if (audio.paused) {

        await audio.play();

        musicToggle.classList.add("is-playing");

        musicToggle.setAttribute("aria-label", "Pause music");

      } else {

        audio.pause();

        musicToggle.classList.remove("is-playing");

        musicToggle.setAttribute("aria-label", "Play music");

      }

    } catch {

      /* waiting for gesture */

    }

  });

}



let currentIndex = 0;
let startX = 0;
let isDragging = false;
let autoRotateInterval;
const carousel = document.getElementById("gallery");

function initGallery() {
  if (!carousel || PHOTO_FILES.length === 0) return;

  // Add images to 3D carousel
  PHOTO_FILES.forEach((name, i) => {
    const img = document.createElement("img");
    img.src = `assets/images/${name}`;
    img.alt = `Memory ${i + 1}`;
    img.loading = i < 4 ? "eager" : "lazy";
    carousel.appendChild(img);
  });

  // Position images in 3D circle
  update3DCarousel();

  // Add touch/swipe support
  carousel.addEventListener("touchstart", handleTouchStart, false);
  carousel.addEventListener("touchmove", handleTouchMove, false);
  carousel.addEventListener("touchend", handleTouchEnd, false);

  // Add mouse drag support
  carousel.addEventListener("mousedown", handleMouseDown, false);
  carousel.addEventListener("mousemove", handleMouseMove, false);
  carousel.addEventListener("mouseup", handleMouseUp, false);
  carousel.addEventListener("mouseleave", handleMouseUp, false);

  // Start auto-rotate
  startAutoRotate();
}

function update3DCarousel() {
  const images = carousel.querySelectorAll("img");
  const angleStep = 360 / images.length;

  images.forEach((img, i) => {
    const angle = (i - currentIndex) * angleStep;
    const radius = 350; // Distance from center
    const normalizedAngle = Math.abs(((angle + 180) % 360) - 180); // Normalize to 0-180
    const opacity = 1 - (normalizedAngle / 180) * 0.5; // Opacity from 1 to 0.5
    const scale = 1 - (normalizedAngle / 180) * 0.3; // Scale from 1 to 0.7

    img.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`;
    img.style.opacity = opacity;
    img.style.zIndex = 10 - Math.round(normalizedAngle / 20); // Z-index based on angle
  });

  carousel.style.transform = `rotateY(${currentIndex * -angleStep}deg)`;
}

function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % PHOTO_FILES.length;
    update3DCarousel();
  }, 3000);
}

function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoRotate();
}

function handleTouchMove(e) {
  if (!isDragging) return;
  e.preventDefault();
}

function handleTouchEnd(e) {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // Swipe left - next
      currentIndex = (currentIndex + 1) % PHOTO_FILES.length;
    } else {
      // Swipe right - prev
      currentIndex = (currentIndex - 1 + PHOTO_FILES.length) % PHOTO_FILES.length;
    }
    update3DCarousel();
  }

  isDragging = false;
  startAutoRotate();
}

function handleMouseDown(e) {
  startX = e.clientX;
  isDragging = true;
  stopAutoRotate();
}

function handleMouseMove(e) {
  if (!isDragging) return;
  e.preventDefault();
}

function handleMouseUp(e) {
  if (!isDragging) return;
  const endX = e.clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      currentIndex = (currentIndex + 1) % PHOTO_FILES.length;
    } else {
      currentIndex = (currentIndex - 1 + PHOTO_FILES.length) % PHOTO_FILES.length;
    }
    update3DCarousel();
  }

  isDragging = false;
  startAutoRotate();
}



function initStickers() {

  if (!stickersLayer || STICKER_FILES.length === 0) return;



  const count = Math.min(STICKER_FILES.length * 3, 12);



  for (let i = 0; i < count; i++) {

    const file = STICKER_FILES[i % STICKER_FILES.length];

    const el = document.createElement("img");

    el.className = "sticker";

    el.src = `assets/stickers/${file}`;

    el.alt = "";

    el.style.left = `${5 + Math.random() * 85}%`;

    el.style.top = `${5 + Math.random() * 85}%`;

    el.style.setProperty("--rot", `${-15 + Math.random() * 30}deg`);

    el.style.animationDelay = `${Math.random() * 2}s`;

    stickersLayer.appendChild(el);

  }

}



function showScreen(id, options = {}) {
  const { viaTension = false } = options;

  document.querySelectorAll(".screen").forEach((section) => {
    const active = section.id === id;
    section.hidden = !active;
    section.classList.toggle("screen--active", active);
  });

  // Handle surprise video
  const surpriseVideo = document.getElementById("surprise-video");
  if (id === "surprise" && surpriseVideo) {
    surpriseVideo.hidden = false;
    // Try to play the video (might require user gesture, which we have since they tapped)
    surpriseVideo.play().catch(() => {
      // If play fails, just show it
    });
  }

  if (viaTension) {
    setTheme("tension");
    window.setTimeout(() => setTheme(THEME_BY_SCREEN[id] || "calm"), 900);
  } else {
    setTheme(THEME_BY_SCREEN[id] || "calm");
  }
}



function initIntro() {

  if (!intro) return;



  intro.addEventListener("click", () => {

    if (PHOTO_FILES.length > 0) {

      showScreen("memories");

    } else {

      showScreen("surprise", { viaTension: true });

    }

  });

}



function initContinue() {

  if (!toSurprise) return;



  toSurprise.addEventListener("click", () => {

    showScreen("surprise", { viaTension: true });

  });

}



function checkIntroBackground() {
  const intro = document.getElementById("intro");
  if (!intro) return;
  const img = new Image();
  img.src = "assets/images/bg-intro.jpg";
  img.onload = () => {
    intro.classList.add("has-bg");
  };
  // If image fails to load, do nothing - the design stays as is
}

function launchConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;

  const colors = ["#ff6b9d", "#ff3d7f", "#ffd700", "#ff8c00", "#ff69b4"];
  const confettiCount = 150;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

function initCandles() {
  const candles = document.querySelectorAll(".candle");
  const cutBtn = document.getElementById("cut-cake");
  
  candles.forEach(candle => {
    candle.addEventListener("click", () => {
      candle.dataset.lit = "false";
      checkAllCandlesBlown();
    });
  });
  
  function checkAllCandlesBlown() {
    const allBlown = Array.from(candles).every(c => c.dataset.lit === "false");
    if (allBlown && cutBtn) {
      cutBtn.style.display = "inline-block";
    }
  }
}

function cutCake() {
  const cutBtn = document.getElementById("cut-cake");
  const toLetterBtn = document.getElementById("to-letter");
  const bigFlower = document.querySelector(".flower-5");

  if (cutBtn) {
    cutBtn.style.display = "none";
    launchConfetti();
    if (bigFlower) {
      bigFlower.style.opacity = "1";
    }
    setTimeout(() => {
      if (toLetterBtn) toLetterBtn.style.display = "inline-block";
    }, 1000);
  }
}

function typeLetter() {
  const typingText = document.getElementById("typing-text");
  if (!typingText) return;

  const text = LETTER_CONTENT.trim();
  let index = 0;

  typingText.textContent = "";

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50); // Typing speed
    }
  }

  type();
}

function initCakeButton() {
  const cutBtn = document.getElementById("cut-cake");
  if (cutBtn) {
    cutBtn.addEventListener("click", cutCake);
  }
}

function initNavigation() {
  const toCakeBtn = document.getElementById("to-cake");
  if (toCakeBtn) {
    toCakeBtn.addEventListener("click", () => showScreen("cake"));
  }

  const toLetterBtn = document.getElementById("to-letter");
  if (toLetterBtn) {
    toLetterBtn.addEventListener("click", () => {
      showScreen("letter");
      setTimeout(typeLetter, 500);
    });
  }
}

setTheme("calm");
applyIntro();
initMusic();
initGallery();
initStickers();
initIntro();
initContinue();
initCandles();
initCakeButton();
initNavigation();


