import { Characteristics } from './characteristics.interface';
import { ModelRuleUnitTroops } from './modelRuleUnitTroops.interface';
import { UnitOptions } from './unit-options.interface';

export interface Unit {
  id: string;
  name: string;
  is_desabled: boolean;
  army_id: string;
  unit_category_id: string;
  principal_organisation_id: string;
  min_size: number;
  max_size: number;
  position: number;
  magic: string;
  notes: string;
  is_mount: boolean;
  type_figurine: number;
  army_organisation_id: string;
  army_organisation_activator_id: string;
  value_points: number;
  add_value_points: number;
  carac: Characteristics;
  organisation_ids: string[];
  all_organisation_ids: string[];
  all_organisations: string[];
  troops: string[];
  model_rule_unit_troops: ModelRuleUnitTroops;
  unit_options: UnitOptions;
  organisation_changes: string[];
}
