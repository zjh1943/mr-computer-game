export const SUN_FAREWELL = '再见了，朋友们，我要走啦！';

export function getConcertAvailability(dayState) {
  return dayState.isNight
    ? { available: true, sunCanJoin: true, message: '月亮升起来了，夜间演唱会开始！' }
    : { available: false, sunCanJoin: false, message: '太阳公公还在天上工作，夜晚演唱会才开始！' };
}

export function buildConcertLineup(slots, dayState, concertActive) {
  const lineup = slots.filter(Boolean).map(slot => ({ ...slot, guest: false }));
  const { sunCanJoin } = getConcertAvailability(dayState);
  if (concertActive && sunCanJoin && !lineup.some(item => item.character === 'mr-sun')) {
    lineup.push({ character: 'mr-sun', soundId: 'sun-voice', guest: true });
  }
  return lineup;
}
