import { Unit } from 'src/app/army/interfaces/unit.interface';

export interface ArmyState {
  units: Unit[];
}

export const initialArmyState: ArmyState = {
  units: [],
};
