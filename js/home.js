// ============================================================
// HOME PAGE SCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. cat plays, then settles + gifts appear ---------- */
  const catStage   = document.getElementById('catStage');
  const giftReveal = document.getElementById('giftReveal');

  // matches: animation: catChase 3.6s linear 2;  (3.6s * 2 loops)
  // NOTE: if you change the "3.6s" in the .cat-rig animation rule in
  // css/style.css, update the 3600 below to match (in milliseconds).
  const CHASE_DURATION_MS = 3600 * 2;

  setTimeout(() => {
    catStage.classList.add('settled');
    giftReveal.classList.add('show');
  }, CHASE_DURATION_MS);


  /* ---------- 2. confetti on cake click ---------- */
  const cakeBtn = document.getElementById('cakeBtn');
  const confettiLayer = document.getElementById('confetti-layer');
  const confettiColors = ['#F3C6D0', '#B9A6DC', '#FBE28A', '#E8DFF5', '#4B3B63'];

  function launchConfetti(count = 90) {
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.width = (6 + Math.random() * 6) + 'px';
      piece.style.height = (10 + Math.random() * 10) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      const duration = 2.2 + Math.random() * 1.6;
      const delay = Math.random() * 0.4;
      piece.style.animationDuration = duration + 's';
      piece.style.animationDelay = delay + 's';
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), (duration + delay) * 1000 + 100);
    }
  }

  cakeBtn.addEventListener('click', () => launchConfetti());


  /* ---------- 3. envelope opens the letter, background blurs ---------- */
  const envelopeBtn = document.getElementById('envelopeBtn');
  const envelopeFlap = document.querySelector('.envelope-flap');
  const letterModal  = document.getElementById('letterModal');
  const blurOverlay  = document.getElementById('blurOverlay');
  const closeLetter  = document.getElementById('closeLetter');

  function openLetter() {
    envelopeFlap.style.transform = 'rotateX(180deg)';
    envelopeFlap.style.transformOrigin = '50% 0%';
    blurOverlay.classList.add('active');
    setTimeout(() => letterModal.classList.add('active'), 150);
  }

  function closeLetterModal() {
    letterModal.classList.remove('active');
    blurOverlay.classList.remove('active');
    setTimeout(() => { envelopeFlap.style.transform = 'rotateX(0deg)'; }, 300);
  }

  envelopeBtn.addEventListener('click', openLetter);
  closeLetter.addEventListener('click', closeLetterModal);
  blurOverlay.addEventListener('click', closeLetterModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLetterModal();
  });

});
