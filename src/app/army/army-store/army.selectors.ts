import { createFeatureSelector, createSelector } from '@ngrx/store';
import { armyFeatureKey } from './army.reducer';
import { ArmyState } from './army.state';

export const selectSharedArmyState =
  createFeatureSelector<ArmyState>(armyFeatureKey);

export const selectArmyState = createSelector(
  selectSharedArmyState,
  (armyFeatureState) => armyFeatureState.units
);
