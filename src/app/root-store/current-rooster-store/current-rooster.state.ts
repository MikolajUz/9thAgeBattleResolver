import { readyUnit } from 'src/app/army/interfaces/rooster.interface';

export interface currentRoosterState {
  rooster: (readyUnit | undefined)[];
}

export const initialCurrentRoosterState: currentRoosterState = {
  rooster: [],
};
