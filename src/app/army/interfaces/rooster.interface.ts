import { unitUI } from 'src/app/UI/unit-ui/unit-ui.interface';

export interface readyUnit {
  aeg: string | null;
  agi: string;
  ap: string;
  arm: string;
  att: string;
  base: string;
  def: string;
  dis: string;
  hp: string;
  of: string;
  res: string;
  str: string;
  type: string;
  unit_type: string;
  Qty: number;
  Pts: string;
  options: string[];
  Name: string;
  Wds: number;
  ID: number;
  fileLength: number;
  selected: boolean;
  unitUI: unitUI;
}
