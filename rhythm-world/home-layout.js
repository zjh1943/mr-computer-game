import { CHARACTER_CATALOG, getCharacter } from './character-catalog.js';

const SHARED_RESIDENTS = ['fun-bot', 'garnold', 'mr-fun-computer'];
const originalPosition = index => ({ x: index % 2 ? -13 : 13, z: Math.floor(index / 2) * 7 - 22 });
const sharedIndex = CHARACTER_CATALOG.findIndex(item => item.id === 'fun-bot');
const sharedPosition = originalPosition(sharedIndex);

export const TOWN_HOUSEHOLDS = [
  { id: 'computer-house', label: '快乐机器人、加诺德和电脑先生合住之家', residents: SHARED_RESIDENTS, ...sharedPosition },
  ...CHARACTER_CATALOG.filter(item => !item.celestial && !SHARED_RESIDENTS.includes(item.id)).map(item => {
    const position = originalPosition(CHARACTER_CATALOG.findIndex(character => character.id === item.id));
    return { id: `${item.id}-house`, label: `${item.name}的家`, residents: [item.id], ...position };
  })
];

export function getHouseholdFor(id) {
  return TOWN_HOUSEHOLDS.find(home => home.residents.includes(id)) || null;
}

export function getResidentLabel(home) {
  return home.residents.map(id => getCharacter(id).name).join('、');
}
