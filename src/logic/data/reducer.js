export default (state = {profile: {}, quests: {}, quest: {}, skills: {}}, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return action.data;
        case 'SET_PROFILE':
            return {...state, profile: action.data};
        case 'SET_USER':
            return {...state, profile: action.data.profile, quests: action.data.quests, skills: action.data.skills};
        case 'SET_QUEST':
          return {...state, quest: action.data};
        default:
            return state;
    }
}
