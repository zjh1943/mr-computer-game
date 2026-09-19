import { ORIGINAL_THEME, notesForKind } from './music-score.js';

export const CHARACTER_SOUND_PROFILES = {
  oren:{kind:'beat',waveform:'square',transpose:-5,beatShift:0,duration:.72,gain:1.05},
  raddy:{kind:'beat',waveform:'sawtooth',transpose:0,beatShift:1,duration:.48,gain:.88},
  clukr:{kind:'effect',waveform:'triangle',transpose:12,beatShift:0,duration:.34,gain:.76},
  'fun-bot':{kind:'voice',waveform:'square',transpose:7,beatShift:1,duration:.58,gain:.72},
  vineria:{kind:'chord',waveform:'triangle',transpose:0,beatShift:2,duration:1.25,gain:.62},
  gray:{kind:'bass',waveform:'sine',transpose:-12,beatShift:0,duration:1.2,gain:1.08},
  brud:{kind:'beat',waveform:'sine',transpose:-7,beatShift:3,duration:.82,gain:1.12},
  garnold:{kind:'bass',waveform:'sawtooth',transpose:0,beatShift:2,duration:.76,gain:.72},
  owakcx:{kind:'effect',waveform:'sawtooth',transpose:5,beatShift:3,duration:.42,gain:.7},
  sky:{kind:'melody',waveform:'sine',transpose:12,beatShift:1,duration:.9,gain:.68},
  'mr-sun':{kind:'chord',waveform:'sine',transpose:12,beatShift:0,duration:1.4,gain:.7},
  durple:{kind:'bass',waveform:'triangle',transpose:-5,beatShift:1,duration:1.1,gain:.83},
  'mr-tree':{kind:'chord',waveform:'triangle',transpose:-7,beatShift:3,duration:1.35,gain:.8},
  simon:{kind:'melody',waveform:'square',transpose:7,beatShift:2,duration:.52,gain:.58},
  tunner:{kind:'whistle',waveform:'sine',transpose:0,beatShift:0,duration:1.05,gain:.68},
  'mr-fun-computer':{kind:'effect',waveform:'square',transpose:0,beatShift:2,duration:.46,gain:.65},
  wenda:{kind:'voice',waveform:'triangle',transpose:5,beatShift:0,duration:.86,gain:.7},
  pinki:{kind:'voice',waveform:'sine',transpose:12,beatShift:2,duration:.72,gain:.67},
  jevin:{kind:'bass',waveform:'sine',transpose:-5,beatShift:3,duration:1.3,gain:.92},
  black:{kind:'bass',waveform:'sawtooth',transpose:-12,beatShift:1,duration:1.45,gain:.78}
};

export function getCharacterSoundProfile(id) {
  return CHARACTER_SOUND_PROFILES[id] || CHARACTER_SOUND_PROFILES.gray;
}

export function notesForCharacter(id) {
  const profile = getCharacterSoundProfile(id), ratio = 2 ** (profile.transpose / 12);
  return notesForKind(profile.kind).map(note => ({ beat: (note.beat + profile.beatShift) % ORIGINAL_THEME.steps, frequency: note.frequency * ratio }));
}
