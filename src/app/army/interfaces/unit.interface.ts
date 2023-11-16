import { unitUI } from 'src/app/players/interfaces/unit-ui.interface';
import { UnitRules, adaptOption } from './unitRules.interface';
import { Injectable } from '@angular/core';
import { unitRaw } from './dataUnit.interface';

export interface Unit {
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
  rules: UnitRules[];
  name: string;
  Wds: number;
  ID: number;
  fileLength: number;
  selected: boolean;
  unitUI: unitUI;
  options: string[];
}

export class Unit {
  constructor(
    public name: string,
    public aeg: string | null,
    public agi: string,
    public ap: string,
    public arm: string,
    public att: string,
    public base: string,
    public def: string,
    public dis: string,
    public hp: string,
    public of: string,
    public res: string,
    public str: string,
    public type: string,
    public unit_type: string,
    public rules: UnitRules[]
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class UnitAdapter {
  adapt(rawData: unitRaw): Unit {
    return new Unit(
      rawData.name,
      rawData.carac.aeg,
      rawData.carac.agi,
      rawData.carac.ap,
      rawData.carac.arm,
      rawData.carac.att,
      rawData.carac.base,
      rawData.carac.def,
      rawData.carac.dis,
      rawData.carac.hp,
      rawData.carac.of,
      rawData.carac.res,
      rawData.carac.str,
      rawData.carac.type,
      rawData.carac.unit_type,
      adaptOption(rawData.model_rule_unit_troops)
    );
  }
}
