export const COMPUTER_ENDURANCE_MS = 105_000;
export const COMPUTER_LOW_POWER = .18;
export const COMPUTER_RESCUE_DELAY_MS = 35_000;
export const COMPUTER_CHARGE_MS = 28_000;

export function createComputerPowerState(capacityMs = COMPUTER_ENDURANCE_MS) {
  return { capacityMs, charge: 1, status: 'flying', rescueAt: null };
}

export function updateComputerPower(state, { dtMs = 0, distanceHome = Infinity, now = 0 }) {
  const next = { ...state };
  if (next.status === 'shutdown') {
    if (now >= next.rescueAt) next.status = 'rescued';
    return next;
  }
  if (next.status === 'rescued') {
    if (distanceHome <= 2.2) {
      next.charge = Math.min(1, next.charge + dtMs / COMPUTER_CHARGE_MS);
      if (next.charge >= 1) { next.status = 'flying'; next.rescueAt = null; }
    }
    return next;
  }
  if (distanceHome <= 1.8 && next.status === 'returning') {
    next.status = 'charging';
  }
  if (next.status === 'charging') {
    next.charge = Math.min(1, next.charge + dtMs / COMPUTER_CHARGE_MS);
    if (next.charge >= 1) next.status = 'flying';
    return next;
  }
  next.charge = Math.max(0, next.charge - dtMs / next.capacityMs);
  if (next.charge <= 0) {
    next.status = 'shutdown';
    next.rescueAt = now + COMPUTER_RESCUE_DELAY_MS;
  } else if (next.charge <= COMPUTER_LOW_POWER + 0.000001) {
    next.status = 'returning';
  }
  return next;
}
