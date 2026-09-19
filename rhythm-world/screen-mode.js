export function engineModeForScreen(screen) {
  if (screen === 'world') return 'world';
  if (screen === 'factory') return 'factory';
  return 'menu';
}
