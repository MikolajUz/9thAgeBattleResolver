import { createReducer, on } from '@ngrx/store';
import { RoosterStoreActions } from './rooster.index';
import { initialPlayersState } from './rooster.state';
import { immerOn } from 'ngrx-immer/store';

export const RoosterFeatureKey = 'currentRooster';

export const RoosterReducer = createReducer(
  initialPlayersState,

  on(RoosterStoreActions.requestRoosterLoad, (state, action) => {
    return {
      ...state,
    };
  }),

  immerOn(RoosterStoreActions.addUnitToRooster, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.push(
      action.nextUnit
    );
  }),

  immerOn(RoosterStoreActions.addWound, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => (unit.ID === action.unitID ? unit.wounds++ : unit)
    );
  }),
  immerOn(RoosterStoreActions.removeWound, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          if (unit.wounds > 0) unit.wounds--;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.increaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.quantity++;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.decreaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.quantity--;
        }
      }
    );
  }),
  immerOn(RoosterStoreActions.deleteUnit, (state, action) => {
    state.players[action.playerIndex].rooster[
      action.roosterIndex
    ].units.forEach((unit, index) => {
      if (unit.ID === action.unitID)
        state.players[action.playerIndex].rooster[
          action.roosterIndex
        ].units.splice(index, 1);
    });
  }),

  immerOn(RoosterStoreActions.setFileLength, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.fileLength = action.fileLength;
        }
      }
    );
  }),

  on(RoosterStoreActions.createUnitUI, (state, action) => {
    return {
      ...state,
    };
  }),

  immerOn(RoosterStoreActions.updateUnitUIData, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.unitUI = action.unitUI;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.selectUnit, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.selected = !unit.selected;
        }
      }
    );
  }),
  on(RoosterStoreActions.updateAllUnitUIData, (state, action) => {
    return {
      ...state,
    };
  })
);
