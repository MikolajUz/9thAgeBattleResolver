import { createReducer, on } from '@ngrx/store';
import { initialArmyState } from './army-list.state';
import { ArmyStoreActions } from './army-list.index';

export const armyFeatureKey = 'armyList';
export const armyReducer = createReducer(
  initialArmyState,
  on(ArmyStoreActions.requestLoadArmy, (state) => {
    return {
      ...state,
    };
  }),
  on(ArmyStoreActions.armyLoaded, (state, action) => {
    return {
      ...state,
      units: action.units,
    };
  })
  // ,
  // on(ArmyStoreActions.requestLoadUnit, (state) => {
  //   return {
  //     ...state,
  //   };
  // }),
  // on(ArmyStoreActions.unitLoaded, (state, action) => {
  //   return {
  //     ...state,
  //     roosterList: state.roosterList.push(action.unit),
  //   };
  // })
);
