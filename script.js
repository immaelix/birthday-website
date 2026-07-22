// Letter content for each card
const letterContent = {
    A: "My dearest love, from the moment I met you, I knew my life would never be the same. You bring so much joy and happiness into my world, and I am forever grateful for you.",
    B: "Every day with you feels like a dream come true. Your smile lights up my darkest days, and your laugh is the most beautiful sound I've ever heard.",
    C: "I cherish every memory we've made together, and I can't wait to create a million more. You are my best friend, my partner, and my everything.",
    D: "Thank you for loving me unconditionally, for supporting me through everything, and for making me a better person. I love you more than words can express.",
    E: "Happy Birthday, my love! May this year bring you all the happiness, success, and love you deserve. Here's to us and our beautiful future together!"
};

// Get elements
const letterCards = document.querySelectorAll('.letter-card');
const letterModal = document.getElementById('letter-modal');
const modalText = document.getElementById('modal-text');
const closeModalBtn = document.getElementById('close-modal');
const voicePlayBtn = document.getElementById('voice-play-btn');
const voiceNote = document.getElementById('voice-note');

// Letter card click handlers
letterCards.forEach(card => {
    card.addEventListener('click', () => {
        const letter = card.dataset.letter;
        modalText.textContent = letterContent[letter];
        letterModal.hidden = false;
    });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    letterModal.hidden = true;
});

// Close modal when clicking outside
letterModal.addEventListener('click', (e) => {
    if (e.target === letterModal) {
        letterModal.hidden = true;
    }
});

// Voice note player
let isPlaying = false;

voicePlayBtn.addEventListener('click', () => {
    if (isPlaying) {
        voiceNote.pause();
        voicePlayBtn.textContent = '▶';
    } else {
        voiceNote.play();
        voicePlayBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
});

// Update button when voice note ends
voiceNote.addEventListener('ended', () => {
    isPlaying = false;
    voicePlayBtn.textContent = '▶';
});
