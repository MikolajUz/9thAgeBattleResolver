import { createAction, props } from '@ngrx/store';
import { readyUnit } from 'src/app/army/interfaces/rooster.interface';

export const requestRoosterLoad = createAction(
  '[Rooster Section] request to load Rooster',
  props<{ roosterTxT: string }>()
);

export const roosterLoaded = createAction(
  '[Rooster Section] Rooster Loaded',
  props<{ rooster: (readyUnit | undefined)[] }>()
);

export const roosterLoadError = createAction(
  '[Rooster Section]  Rooster Loading Error'
);

export const addReadyUnitToRooster = createAction(
  '[Rooster Section] request to add unit to rooster',
  props<{ nextUnit: readyUnit | undefined }>()
);
