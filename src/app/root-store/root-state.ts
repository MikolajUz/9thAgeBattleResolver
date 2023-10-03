import { ArmyStoreState } from './army-list-store/army-list.index';

export interface RootState {
  units: ArmyStoreState.ArmyState;
}
