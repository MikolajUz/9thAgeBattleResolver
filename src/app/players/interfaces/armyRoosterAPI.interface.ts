import { Unit } from '../../army/interfaces/unit.interface';

export interface RoosterUnit {
  carac: Unit;
  name: string;
}

export interface ArmyRoosterAPI {
  units: RoosterUnit[];
  name: string;
}
