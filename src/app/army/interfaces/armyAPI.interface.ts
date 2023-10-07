import { Unit } from './unit.interface';

export interface ArmyAPI {
  // id: string;
  // version_id: string;
  // source: string;
  // is_disabled: boolean;
  // initials: string;
  // is_latest: boolean;
  // name: string;
  // name_with_sub_version: string;
  // updated_at: string;
  // medium_logo: string;
  // large_logo: string;
  // category_id: string;
  // organisations: string[];
  // army_organisations: string[];
  // magic_item_categories: string[];
  // magic_items: string[];
  // magic_standards: string[];
  // model_rule_categories: string[];
  // model_rule_limits: string[];
  // model_rules: string[];
  units: Unit[];
}
