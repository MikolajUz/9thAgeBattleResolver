import { readyUnit } from './rooster.interface';

export interface RoosterUnit {
  carac: readyUnit;
  name: string;
}

export interface ArmyRoosterAPI {
  units: RoosterUnit[];
  name: string;
}
