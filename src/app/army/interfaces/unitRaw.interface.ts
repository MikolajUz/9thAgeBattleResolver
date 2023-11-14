import { Characteristics } from './characteristics.interface';
import { ModelRuleUnitTroops } from './modelRuleUnitTroops.interface';

export interface unitRaw {
  is_mount: boolean;
  carac: Characteristics;
  name: string;
  model_rule_unit_troops: ModelRuleUnitTroops[];
}
