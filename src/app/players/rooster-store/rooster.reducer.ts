import { createReducer, on } from '@ngrx/store';
import { RoosterStoreActions } from './rooster.index';
import { initialPlayersState } from './rooster.state';
import { immerOn } from 'ngrx-immer/store';

export const currentRoosterFeatureKey = 'currentRooster';

export const currentRoosterReducer = createReducer(
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
      (unit) => (unit.ID === action.ID ? unit.Wds++ : unit)
    );
  }),
  immerOn(RoosterStoreActions.removeWound, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.ID) {
          if (unit.Wds > 0) unit.Wds--;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.increaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.ID) {
          unit.Qty++;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.decreaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.ID) {
          unit.Qty--;
        }
      }
    );
  }),
  immerOn(RoosterStoreActions.deleteUnit, (state, action) => {
    state.players[action.playerIndex].rooster[
      action.roosterIndex
    ].units.forEach((unit, index) => {
      if (unit.ID === action.ID)
        state.players[action.playerIndex].rooster[
          action.roosterIndex
        ].units.splice(index, 1);
    });
  }),

  immerOn(RoosterStoreActions.setFileLength, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.ID) {
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
        if (unit.ID === action.ID) {
          unit.unitUI = action.unitUI;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.selectUnit, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.ID) {
          unit.selected = !unit.selected;
        }
      }
    );
  })
);
