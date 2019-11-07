export default (state = {profile: {
    "brows" : "type-2",
    "eyes" : "type-5",
    "hairColor" : "black",
    "hairStyle" : "type-5",
    "headShape" : "type-4",
    "mouth" : "type-8",
    "name" : "Tom",
    "nose" : "type-1",
    "skinColor" : "tan"},
  quests: {0: {
  "description" : "Train for a 5K run",
    "expVal" : 10,
    "name" : "5K",
    "skill" : "running"
}, 1:{
  "description" : "knit my mom a sweater for Christmas",
    "expVal" : 8,
    "name" : "knit a sweater",
    "skill" : "knitting"
}}, quest: {}, skills: {0: {
      "attribute" : "athletics",
      "name" : "running",
      "val" : 24
    }, 1:{
      "attribute" : "athletics",
      "name" : "jogging",
      "val" : 24
    },2: {
      "attribute" : "crafts",
      "name" : "knitting",
      "val" : 8
    }}}, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return action.data;
    case 'SET_PROFILE':
      return {...state, profile: action.data};
    case 'SET_USER':
      return {profile: action.data.profile, quests: action.data.quests, skills: action.data.skills};
    case 'SET_QUEST':
      return {...state, quest: action.data};
    default:
      return state;
  }
}