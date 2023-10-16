import { createReducer, on } from '@ngrx/store';
import { RoosterStoreActions } from './current-rooster.index';
import { initialCurrentRoosterState } from './current-rooster.state';
import { act } from '@ngrx/effects';

export const currentRoosterFeatureKey = 'currentRooster';

export const currentRoosterReducer = createReducer(
  initialCurrentRoosterState,

  on(RoosterStoreActions.requestRoosterLoad, (state, action) => {
    return {
      ...state,
    };
  }),
  on(RoosterStoreActions.roosterLoaded, (state, action) => {
    return {
      ...state,
      rooster: action.rooster,
    };
  }),
  on(RoosterStoreActions.addReadyUnitToRoosterPlr1, (state, action) => {
    return {
      ...state,
      roosterPlr1: [...state.roosterPlr1, action.nextUnit],
    };
  }),
  on(RoosterStoreActions.addReadyUnitToRoosterPlr2, (state, action) => {
    return {
      ...state,
      roosterPlr2: [...state.roosterPlr2, action.nextUnit],
    };
  }),
  on(RoosterStoreActions.selectUnit, (state, action) => {
    return {
      ...state,
    };
  })
);
