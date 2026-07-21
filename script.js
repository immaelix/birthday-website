/**

 * Assets — drop files in folders, then list names below.

 */



const PHOTO_FILES = [

  // "photo-01.jpg",

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



const THEME_BY_SCREEN = {

  intro: "calm",

  memories: "warm",

  surprise: "spicy",

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



function initGallery() {

  if (!gallery || PHOTO_FILES.length === 0) return;



  PHOTO_FILES.forEach((name, i) => {

    const img = document.createElement("img");

    img.src = `assets/images/${name}`;

    img.alt = `Memory ${i + 1}`;

    img.loading = i < 4 ? "eager" : "lazy";

    gallery.appendChild(img);

  });

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

setTheme("calm");
checkIntroBackground();
applyIntro();
initMusic();
initGallery();
initStickers();
initIntro();
initContinue();


