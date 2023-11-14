import { ArmyStoreState } from '../army/army-store/army.index';
import { currentRoosterState } from '../players/current-rooster-store/current-rooster.state';

export interface RootState {
  units: ArmyStoreState.ArmyState;
  rooster: currentRoosterState;
}
