import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoosterStoreState } from './current-rooster.index';
import { currentRoosterFeatureKey } from './current-rooster.reducer';

export const selectSharedRoosterState =
  createFeatureSelector<RoosterStoreState.currentRoosterState>(
    "currentRooster"
  );

export const selectCurrentRoosterState = createSelector(
  selectSharedRoosterState,
  (roosterState) => roosterState.rooster
);
