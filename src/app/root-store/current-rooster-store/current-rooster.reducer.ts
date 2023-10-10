import { createReducer, on } from '@ngrx/store';
import { RoosterStoreActions } from './current-rooster.index';
import { initialCurrentRoosterState } from './current-rooster.state';

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
  on(RoosterStoreActions.addReadyUnitToRooster, (state,action)=>{
    return{
      ...state,
      rooster: [...state.rooster,action.nextUnit]
    }
  })
);
