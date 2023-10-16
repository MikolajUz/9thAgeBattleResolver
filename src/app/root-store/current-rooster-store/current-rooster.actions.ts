import { createAction, props } from '@ngrx/store';
import { readyUnit } from 'src/app/army/interfaces/rooster.interface';

export const requestRoosterLoad = createAction(
  '[Rooster Section] request to load Rooster',
  props<{ roosterTxT: string; player: string }>()
);

export const roosterLoaded = createAction(
  '[Rooster Section API] Rooster Loaded',
  props<{ rooster: (readyUnit | undefined)[] }>()
);

export const roosterLoadError = createAction(
  '[Rooster Section]  Rooster Loading Error'
);

export const addReadyUnitToRoosterPlr1 = createAction(
  '[Rooster Section] request to add unit to player one rooster',
  props<{ nextUnit: readyUnit | undefined }>()
);

export const addReadyUnitToRoosterPlr2 = createAction(
  '[Rooster Section] request to add unit to player two rooster',
  props<{ nextUnit: readyUnit | undefined }>()
);

export const selectUnit = createAction(
  '[Rooster Section] request to add unit to rooster',
  props<{ ID: number }>()
);
