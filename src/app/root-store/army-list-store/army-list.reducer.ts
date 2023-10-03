import { createReducer, on } from '@ngrx/store';
import { initialArmyState } from './army-list.state';
import * as actions from './army-list.actions';

export const armyFeatureKey = 'armyList';
export const armyReducer = createReducer(
  initialArmyState,
  on(actions.requestLoadArmy, (state) => {
    return {
      ...state,
    };
  }),
  on(actions.armyLoaded, (state, action) => {
    return {
      ...state,
      units: action.units,
    };
  })
);
