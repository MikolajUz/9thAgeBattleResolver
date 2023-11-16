import { createAction, props } from '@ngrx/store';
import { unitUI } from '../interfaces/unit-ui.interface';
import { Unit } from 'src/app/army/interfaces/unit.interface';

export const requestRoosterLoad = createAction(
  '[Rooster Section] request to load Rooster',
  props<{ roosterTxT: string; playerIndex: number; roosterIndex: number }>()
);

export const addUnitToRooster = createAction(
  '[Rooster Section] request to add unit to rooster',
  props<{
    nextUnit: Unit;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const increaseQuantity = createAction(
  '[Rooster Section] increase quantity of unit',
  props<{ ID: number; playerIndex: number; roosterIndex: number }>()
);

export const decreaseQuantity = createAction(
  '[Rooster Section] decrease quantity of unit',
  props<{ ID: number; playerIndex: number; roosterIndex: number }>()
);

export const addWound = createAction(
  '[Rooster Section] add wound to unit',
  props<{ ID: number; playerIndex: number; roosterIndex: number }>()
);

export const removeWound = createAction(
  '[Rooster Section] remove wound from unit',
  props<{ ID: number; playerIndex: number; roosterIndex: number }>()
);

export const deleteUnit = createAction(
  '[Rooster Section] delete unit from store',
  props<{ ID: number; playerIndex: number; roosterIndex: number }>()
);

export const setFileLength = createAction(
  '[Rooster Section] set unit file length ',
  props<{
    ID: number;
    fileLength: number;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const createUnitUI = createAction(
  '[Rooster Section] create unit on battlefield',

  props<{
    ID: number;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const updateUnitUIData = createAction(
  '[Rooster Section] update unit visual data',

  props<{
    unitUI: unitUI;
    ID: number;
    playerIndex: number;
    roosterIndex: number;
  }>()
);

export const selectUnit = createAction(
  '[Rooster Section] change selected property of unit',
  props<{ ID: number; playerIndex: number; roosterIndex: number }>()
);
