export default (state = {profile: {}, quests: {}, quest: {}}, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return action.data;
        case 'SET_PROFILE':
            return {...state, profile: action.data};
        case 'SET_QUESTS':
            return {...state, quests: action.data};
        case 'SET_QUEST':
          return {...state, quest: action.data};
        default:
            return state;
    }
}
