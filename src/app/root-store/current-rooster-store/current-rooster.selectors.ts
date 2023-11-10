import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoosterStoreState } from './current-rooster.index';
import { currentRoosterFeatureKey } from './current-rooster.reducer';
import { RoosterUnit } from 'src/app/army/interfaces/armyRoosterAPI.interface';
import { readyUnit } from 'src/app/army/interfaces/rooster.interface';

export const selectSharedRoosterState =
  createFeatureSelector<RoosterStoreState.currentRoosterState>(
    'currentRooster'
  );

export const selectCurrentRoosterStatePlr1 = createSelector(
  selectSharedRoosterState,
  (roosterState) => roosterState.roosterPlr1
);

export const selectCurrentRoosterStatePlr2 = createSelector(
  selectSharedRoosterState,
  (roosterState) => roosterState.roosterPlr2
);

export const selectUnitUIDataPlr1 = (ID: number) =>
  createSelector(
    selectSharedRoosterState,
    (roosterState) =>
      roosterState.roosterPlr1.filter((unit) => unit?.ID === ID)[0]?.unitUI
  );

  export const selectUnitQuantityPlr1 = (ID: number) =>
  createSelector(
    selectSharedRoosterState,
    (roosterState) =>
      roosterState.roosterPlr1.filter((unit) => unit?.ID === ID)[0]?.Qty
  );

  export const selectUnitFileLengthPlr1 = (ID: number) =>
  createSelector(
    selectSharedRoosterState,
    (roosterState) =>
      roosterState.roosterPlr1.filter((unit) => unit?.ID === ID)[0]?.fileLength
  );

  export const selectUnitBasePlr1 = (ID: number) =>
  createSelector(
    selectSharedRoosterState,
    (roosterState) =>
      roosterState.roosterPlr1.filter((unit) => unit?.ID === ID)[0]?.base
  );

  export const selectUnitPlr1 = (ID: number) =>
  createSelector(
    selectSharedRoosterState,
    (roosterState) =>
      roosterState.roosterPlr1.filter((unit) => unit?.ID === ID)[0]
  );

