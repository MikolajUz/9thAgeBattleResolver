import { createReducer, on } from '@ngrx/store';
import { RoosterStoreActions } from './rooster.index';
import { initialPlayersState } from './rooster.state';
import { immerOn } from 'ngrx-immer/store';
import { UnitRules } from 'src/app/army/interfaces/unitRules.interface';
import { skirmishScore } from 'src/app/main/interfaces/skirmishScore.interface';

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
      (unit) =>
        unit.ID === action.unitID
          ? (unit.wounds = unit.wounds + action.amount)
          : unit
    );
  }),
  immerOn(RoosterStoreActions.removeWound, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          if (unit.wounds > 0) unit.wounds = unit.wounds - action.amount;
        }
      }
    );
  }),
  immerOn(RoosterStoreActions.setWounds, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.wounds = action.wounds;
        }
      }
    );
  }),
  immerOn(RoosterStoreActions.increaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.quantity = unit.quantity + action.amount;
        }
      }
    );
  }),

  immerOn(RoosterStoreActions.decreaseQuantity, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) => {
        if (unit.ID === action.unitID) {
          unit.quantity = unit.quantity - action.amount;
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
      (unit) =>
        unit.ID === action.unitID ? (unit.selected = !unit.selected) : null
    );
  }),
  on(RoosterStoreActions.updateAllUnitUIData, (state, action) => {
    return {
      ...state,
    };
  }),
  on(RoosterStoreActions.runAllSkirmishes, (state, action) => {
    return {
      ...state,
    };
  }),
  immerOn(RoosterStoreActions.changeOnBattlefieldProperty, (state, action) => {
    state.players[action.playerIndex].rooster[action.roosterIndex].units.map(
      (unit) =>
        unit.ID === action.unitID
          ? (unit.onBattlefield = !unit.onBattlefield)
          : null
    );
  }),
  immerOn(RoosterStoreActions.updateScore, (state, action) => {
    state.players[action.playerIndex].score.map((unit) => {
      unit.unitIndex === action.unitIndex
        ? (unit[action.propertyName] = action.changeValue)
        : null;
    });
  }),
  immerOn(RoosterStoreActions.scoreInit, (state, action) => {
    state.players[action.playerIndex].score.push(
      new skirmishScore(
        0,
        action.playerIndex,
        action.unitIndex,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        [],
        0,
        0,
        0,
        0,
        0
      )
    );
  }),
  immerOn(RoosterStoreActions.clearScore, (state) => {
    state.players.forEach((player) => {
      player.score = [];
    });
  })
);
