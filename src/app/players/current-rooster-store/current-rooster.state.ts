import { Unit } from 'src/app/army/interfaces/unit.interface';

export interface currentRoosterState {
  roosterPlr1: (Unit | undefined)[];
  roosterPlr2: (Unit | undefined)[];
}

export const initialCurrentRoosterState: currentRoosterState = {
  roosterPlr1: [],
  roosterPlr2: [],
};
