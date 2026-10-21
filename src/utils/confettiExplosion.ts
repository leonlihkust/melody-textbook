import confetti from 'canvas-confetti';

/**
 * High-energy, festive confetti animations for Millen Woods Mariners
 */

// Maritime & Trophy Theme Colors
const FESTIVE_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#ef4444', '#fbbf24'];
const GOLDEN_BADGE_COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#fef08a', '#60a5fa', '#34d399'];

/**
 * Spectacular fireworks & double-cannon explosion for completing a full math week!
 */
export function triggerWeekVictoryConfetti() {
  // Wave 1: Immediate powerful center blast
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { y: 0.6 },
    colors: FESTIVE_COLORS,
    startVelocity: 45,
    ticks: 300,
    gravity: 0.9,
  });

  // Wave 2: Left & Right Dual Side Cannons after 200ms
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 65,
      origin: { x: 0.05, y: 0.7 },
      colors: ['#f59e0b', '#3b82f6', '#38bdf8', '#fbbf24'],
      startVelocity: 55,
      ticks: 350,
    });

    confetti({
      particleCount: 60,
      angle: 120,
      spread: 65,
      origin: { x: 0.95, y: 0.7 },
      colors: ['#10b981', '#8b5cf6', '#ec4899', '#fbbf24'],
      startVelocity: 55,
      ticks: 350,
    });
  }, 220);

  // Wave 3: Golden Star Shower after 500ms
  setTimeout(() => {
    confetti({
      particleCount: 70,
      spread: 100,
      origin: { y: 0.45 },
      colors: GOLDEN_BADGE_COLORS,
      shapes: ['star', 'circle'],
      scalar: 1.2,
      startVelocity: 35,
      ticks: 300,
    });
  }, 500);

  // Wave 4: Grand finale stream after 900ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 120,
      origin: { y: 0.55 },
      colors: FESTIVE_COLORS,
      startVelocity: 40,
      ticks: 250,
    });
  }, 900);
}

/**
 * Sparkling celebration when a student earns a new Badge in World Explorer or Vault!
 */
export function triggerBadgeUnlockConfetti() {
  // Radiant burst from center
  confetti({
    particleCount: 90,
    spread: 90,
    origin: { y: 0.5 },
    colors: GOLDEN_BADGE_COLORS,
    shapes: ['star', 'circle'],
    scalar: 1.25,
    startVelocity: 45,
    ticks: 350,
    gravity: 0.85,
  });

  // Dual side celebratory pops
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 55,
      spread: 60,
      origin: { x: 0.15, y: 0.65 },
      colors: ['#fbbf24', '#f59e0b', '#10b981'],
    });

    confetti({
      particleCount: 45,
      angle: 125,
      spread: 60,
      origin: { x: 0.85, y: 0.65 },
      colors: ['#fbbf24', '#3b82f6', '#8b5cf6'],
    });
  }, 250);
}
