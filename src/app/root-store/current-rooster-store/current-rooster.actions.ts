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

export const increaseQuantityPlr1 = createAction(
  '[Rooster Section] increase quantity of unit of player one',
  props<{ ID: number }>()
);

export const decreaseQuantityPlr1 = createAction(
  '[Rooster Section] decrease quantity of unit of player one',
  props<{ ID: number }>()
);

export const addWoundPlr1 = createAction(
  '[Rooster Section] add wound to unit of player one',
  props<{ ID: number }>()
);

export const removeWoundPlr1 = createAction(
  '[Rooster Section] remove wound from unit of player one',
  props<{ ID: number }>()
);

//Player two

export const increaseQuantityPlr2 = createAction(
  '[Rooster Section] increase quantity of unit of player two',
  props<{ ID: number }>()
);

export const decreaseQuantityPlr2 = createAction(
  '[Rooster Section] decrease quantity of unit of player two',
  props<{ ID: number }>()
);

export const addWoundPlr2 = createAction(
  '[Rooster Section] add wound to unit of player two',
  props<{ ID: number }>()
);

export const removeWoundPlr2 = createAction(
  '[Rooster Section] remove wound from unit of player two',
  props<{ ID: number }>()
);
export const deleteUnitPlr1 = createAction(
  '[Rooster Section] delete unit of player one',
  props<{ ID: number }>()
);

export const deleteUnitPlr2 = createAction(
  '[Rooster Section] delete unit of player two',
  props<{ ID: number }>()
);

export const setFileLengthPlr1 = createAction(
  '[Rooster Section] set unit file length of player one',
  props<{ ID: number; fileLength: number }>()
);

export const setFileLengthPlr2 = createAction(
  '[Rooster Section] set unit file length of player two',
  props<{ ID: number; fileLength: number }>()
);

export const selectUnit = createAction(
  '[Rooster Section] request to add unit to rooster',
  props<{ ID: number }>()
);
