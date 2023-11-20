import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoosterStoreState } from './rooster.index';
import { Unit } from 'src/app/army/interfaces/unit.interface';

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
  unitID: number
) =>
  createSelector(selectSharedRoosterState, (roosterState) =>
    roosterState.players[playerIndex].rooster[roosterIndex].units.find(
      (unit) => unit.ID === unitID
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
  unitID: number
) =>
  createSelector(
    selectUnitByID(playerIndex, roosterIndex, unitID),
    (unit) => unit?.unitUI
  );

export const selectUnitPropertyByID = (
  playerIndex: number,
  roosterIndex: number,
  unitID: number,
  propertyName: keyof Unit
) =>
  createSelector(
    selectUnitByID(playerIndex, roosterIndex, unitID),
    (unit) => unit![propertyName]
  );
