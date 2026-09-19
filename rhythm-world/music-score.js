export const ORIGINAL_THEME = { tempo: 108, steps: 16 };

const PARTS = {
  beat: [
    [0, 82], [2, 130], [4, 82], [6, 155], [8, 82], [10, 130], [12, 98], [14, 165]
  ],
  melody: [
    [0, 329.63], [2, 392], [4, 493.88], [6, 392], [8, 293.66], [10, 369.99], [12, 440], [14, 369.99]
  ],
  voice: [
    [0, 196], [3, 246.94], [6, 220], [9, 293.66], [12, 246.94], [15, 220]
  ],
  effect: [
    [1, 659.25], [5, 783.99], [9, 587.33], [13, 880]
  ],
  whistle: [
    [0, 523.25], [3, 659.25], [7, 587.33], [11, 783.99], [15, 659.25]
  ]
};

export function notesForKind(kind) {
  return (PARTS[kind] || PARTS.effect).map(([beat, frequency]) => ({ beat, frequency }));
}
