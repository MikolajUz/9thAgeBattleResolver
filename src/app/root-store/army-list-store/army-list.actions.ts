import { createAction, props } from '@ngrx/store';
import { Unit } from 'src/app/army/interfaces/unit.interface';

export const requestLoadArmy = createAction(
  '[armyList Section] Request to Load Army'
);

export const armyLoaded = createAction(
  '[armyList Section API] Army Loaded',
  props<{ units: Unit[] }>()
);

export const armyLoadError = createAction(
  '[armyList Section API] Army Loading Error'
);

export const requestLoadUnit = createAction(
  '[armyList Section] Request to Load Unit',
  props<{ name: string }>()
);

export const unitLoaded = createAction(
  '[armyList Section API] Unit Loaded',
  props<{ unit: Unit }>()
);

export const unitLoadError = createAction(
  '[armyList Section API] Unit Loading Error'
);
