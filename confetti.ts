import confetti from 'canvas-confetti';

export function celebrateGold() {
  const colors = ['#FFD23F', '#FF1E27', '#EC0C16', '#FFFFFF'];
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors,
    zIndex: 9999,
  });
}

export function celebrateBig() {
  const colors = ['#FFD23F', '#FF1E27', '#EC0C16', '#00E5FF', '#FFFFFF'];
  const end = Date.now() + 1200;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
      zIndex: 9999,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function celebrateCorrect() {
  confetti({
    particleCount: 40,
    spread: 60,
    startVelocity: 35,
    origin: { y: 0.5 },
    colors: ['#FFD23F', '#00E5FF', '#FFFFFF'],
    zIndex: 9999,
    scalar: 0.8,
  });
}
