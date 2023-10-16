import { createReducer, on } from '@ngrx/store';
import { RoosterStoreActions } from './current-rooster.index';
import { initialCurrentRoosterState } from './current-rooster.state';
import { act } from '@ngrx/effects';
import { addReadyUnitToRoosterPlr1 } from './current-rooster.actions';
import { filter } from 'rxjs';
import { unitLoadError } from '../army-list-store/army-list.actions';

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

  on(RoosterStoreActions.addWoundPlr1, (state, action) => {
    return {
      ...state,
      roosterPlr1: [...state.roosterPlr1].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          if (unit.wounds + 1 < Number(unit.hp)) unit.wounds++;
        }
        return unit;
      }),
    };
  }),
  on(RoosterStoreActions.removeWoundPlr1, (state, action) => {
    return {
      ...state,
      roosterPlr1: [...state.roosterPlr1].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          if (unit.wounds) unit.wounds--;
        }
        return unit;
      }),
    };
  }),
  on(RoosterStoreActions.increaseQuantityPlr1, (state, action) => {
    return {
      ...state,
      roosterPlr1: [...state.roosterPlr1].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          unit.quantity++;
        }
        return unit;
      }),
    };
  }),
  on(RoosterStoreActions.decreaseQuantityPlr1, (state, action) => {
    return {
      ...state,
      roosterPlr1: [...state.roosterPlr1].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          if (unit.quantity !== 1) unit.quantity--;
        }
        return unit;
      }),
    };
  }),

  on(RoosterStoreActions.addWoundPlr2, (state, action) => {
    return {
      ...state,
      roosterPlr2: [...state.roosterPlr2].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          if (unit.wounds + 1 < Number(unit.hp)) unit.wounds++;
        }
        return unit;
      }),
    };
  }),
  on(RoosterStoreActions.removeWoundPlr2, (state, action) => {
    return {
      ...state,
      roosterPlr2: [...state.roosterPlr2].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          if (unit.wounds) unit.wounds--;
        }
        return unit;
      }),
    };
  }),
  on(RoosterStoreActions.increaseQuantityPlr2, (state, action) => {
    return {
      ...state,
      roosterPlr2: [...state.roosterPlr2].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          unit.quantity++;
        }
        return unit;
      }),
    };
  }),
  on(RoosterStoreActions.decreaseQuantityPlr2, (state, action) => {
    return {
      ...state,
      roosterPlr2: [...state.roosterPlr2].map((unit) => {
        if (unit?.ID === action.ID) {
          unit = { ...unit };
          if (unit.quantity !== 1) unit.quantity--;
        }
        return unit;
      }),
    };
  }),
  on(RoosterStoreActions.deleteUnitPlr1, (state, action) => {
    return {
      ...state,

      roosterPlr1: state.roosterPlr1.filter((unit) => unit?.ID !== action.ID),
    };
  }),
  on(RoosterStoreActions.deleteUnitPlr2, (state, action) => {
    return {
      ...state,
      roosterPlr2: state.roosterPlr2.filter((unit) => unit?.ID !== action.ID),
    };
  }),

  on(RoosterStoreActions.selectUnit, (state, action) => {
    return {
      ...state,
    };
  })
);
