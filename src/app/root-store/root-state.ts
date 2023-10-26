import { ArmyStoreState } from './army-list-store/army-list.index';
import { currentRoosterState } from './current-rooster-store/current-rooster.state';

export interface RootState {
  units: ArmyStoreState.ArmyState;
  rooster: currentRoosterState;
}
