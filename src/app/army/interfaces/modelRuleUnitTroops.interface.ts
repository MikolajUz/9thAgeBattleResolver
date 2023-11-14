export interface ModelRuleUnitTroops {
  name: string;
  description: string;
  type_rule: string;
}

export class ModelRuleUnitTroops {
  constructor(
    public name: string,
    public description: string,
    public type_rule: string
  ) {}
}

export const adaptOption = (
  optionRaw: ModelRuleUnitTroops[]
): ModelRuleUnitTroops[] => {
  let array: ModelRuleUnitTroops[] = [];
  optionRaw.forEach((option) =>
    array.push(
      new ModelRuleUnitTroops(option.name, option.description, option.type_rule)
    )
  );
  return array;
};
