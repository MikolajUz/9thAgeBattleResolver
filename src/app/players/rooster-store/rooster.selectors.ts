import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoosterStoreState } from './rooster.index';

export const selectSharedRoosterState =
  createFeatureSelector<RoosterStoreState.PlayersState>('currentRooster');

export const selectUnit = (
  playerIndex: number,
  roosterIndex: number,
  name: string
) =>
  createSelector(selectSharedRoosterState, (roosterState) =>
    roosterState.players[playerIndex].rooster[roosterIndex].units.find(
      (unit) => unit.name === name
    )
  );

export const selectUnitByID = (
  playerIndex: number,
  roosterIndex: number,
  ID: number
) =>
  createSelector(selectSharedRoosterState, (roosterState) =>
    roosterState.players[playerIndex].rooster[roosterIndex].units.find(
      (unit) => unit.ID === ID
    )
  );

export const selectRooster = (playerIndex: number, roosterIndex: number) =>
  createSelector(
    selectSharedRoosterState,
    (rooster) => rooster.players[playerIndex].rooster[roosterIndex].units
  );

export const selectUnitUIData = (
  playerIndex: number,
  roosterIndex: number,
  ID: number
) =>
  createSelector(
    selectUnitByID(playerIndex, roosterIndex, ID),
    (unit) => unit?.unitUI
  );
