//For redux

// import { sendSystemMessage } from './messages';
// import { AUTH_HOST, AUTH_PROJECT_NAME } from 'config';
// import {falcorGraph} from "../falcorGraph";
// import {
//   login,
//   logout,
//   setActiveCousubid,
//   setActiveGeoid,
//   setActivePlan,
//   setUserToken,
// } from './user';

// const SET_CATEGORY = 'USER::SET_CATGEORY';

// function setCategory(id) {
//   return {
//     type: SET_CATEGORY,
//     id,
//   };
// }

// export const setActiveCategory = (id) => {
//   return (dispatch) => {
//     dispatch(setCategory(id));
//   };
// };

// export const actions = {
//   setActiveCategory,
// };

// let initialState = {
//   activeCategory: '',
// };

// const ACTION_HANDLERS = {
//   [SET_CATEGORY]: (state = initialState, action) => {
//     const newState = Object.assign({}, state);
//     if (action.id) {
//       newState.activeRiskScenarioId = action.id;
//       localStorage.setItem('activeCategory', newState.activeCategory);
//     }
//     return newState;
//   },
// };

// export default function scenarioReducer(state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type];
//   return handler ? handler(state, action) : state;
// }
