import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoosterStoreState } from './current-rooster.index';
import { currentRoosterFeatureKey } from './current-rooster.reducer';

export const selectSharedRoosterState =
  createFeatureSelector<RoosterStoreState.currentRoosterState>(
    "currentRooster"
  );

export const selectCurrentRoosterStatePlr1 = createSelector(
  selectSharedRoosterState,
  (roosterState) => roosterState.roosterPlr1
);

export const selectCurrentRoosterStatePlr2 = createSelector(
  selectSharedRoosterState,
  (roosterState) => roosterState.roosterPlr2
);
