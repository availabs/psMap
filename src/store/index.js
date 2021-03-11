import { applyMiddleware, combineReducers, createStore } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as graph } from 'utils/redux-falcor';
import { AvlInTheMiddle } from 'AvlMap/ReduxMiddleware';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import category from './modules/category';

const history = createHistory({});

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [routerMiddleware(history), thunk, AvlInTheMiddle];

const store = createStore(
  combineReducers({
    category,
    router: routerReducer,
  }),
  applyMiddleware(...middleware),
);

export default store;
export { history };
