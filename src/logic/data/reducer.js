export default (
  state = { profile: {}, quests: [], quest: {}, skills: [], attributes: [] },
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
    case 'SET_USER':
      return {
        profile: action.data.profile,
        quests: action.data.quests,
        skills: action.data.skills
      };
    case 'SET_QUEST':
      return {...state, quest: action.data};
    default:
      return state;
  }
};
