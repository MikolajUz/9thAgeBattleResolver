import { createFeatureSelector, createSelector } from '@ngrx/store';
import { armyFeatureKey } from './army-list.reducer';
import { ArmyState } from './army-list.state';

export const selectSharedArmyState =
  createFeatureSelector<ArmyState>(armyFeatureKey);

export const selectArmyState = createSelector(
  selectSharedArmyState,
  (armyFeatureState) => armyFeatureState.units
);
