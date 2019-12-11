export default (
  state = { profile: {}, character: {characterName: 'name', avatar: 0, mainLevel: 1, mainLevelXp: 0, mainLevelXpToNext: 50, calender: [{'string' : "empty"}]}, quests: [], quest: {}, skills: [], attributes: { fitness: { id: 'fitness', exp: 0, level: 1, xpToNext: 50}, academics: { id: 'academics',exp: 0, level: 1, xpToNext: 50 }, crafts: { id: 'crafts', exp: 0, level: 1, xpToNext: 50 }, community: {id: 'community', exp: 0, level: 1 , xpToNext: 50}, mental: { id: 'mental', exp: 0, level: 1 , xpToNext: 50}, hobby: {id: 'hobby', exp: 0, level: 1, xpToNext: 50 } } },
  action
) => {
  switch (action.type) {
    case 'GET_DATA':
      return action.data;
    case 'SET_PROFILE':
      return { ...state, profile: action.data };
    case 'SET_SKILLS':
      return { ...state, skills: action.data };
    case 'SET_ATTRIBUTES':
      return { ...state, attributes: action.data };
    case 'SET_QUESTS':
      return { ...state, quests: action.data };
    case 'SET_CHARACTER':
      return {...state, character: action.data};
    case 'SET_USER':
      return {
        profile: action.data.profile,
        quests: action.data.quests,
        skills: action.data.skills,
        character: action.data.character
      };
    case 'SET_QUEST':
      return {...state, quest: action.data};
    default:
      return state;
  }
};
