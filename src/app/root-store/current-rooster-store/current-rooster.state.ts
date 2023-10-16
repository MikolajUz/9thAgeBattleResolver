import { readyUnit } from 'src/app/army/interfaces/rooster.interface';

export interface currentRoosterState {
  roosterPlr1: (readyUnit | undefined)[];
  roosterPlr2: (readyUnit | undefined)[];
}

export const initialCurrentRoosterState: currentRoosterState = {
  roosterPlr1: [],
  roosterPlr2: [],
};
