import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoosterStoreActions } from './rooster.index';
import { RoosterService } from '../services/rooster.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { VisualsService } from '../services/visuals.service';

@Injectable()
export class currentRoosterStoreEffects {
  constructor(
    private roosterService: RoosterService,
    private visualsService: VisualsService,
    private action$: Actions
  ) {}

  loadRooster$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.requestRoosterLoad),
        tap((roosterName) =>
          this.roosterService.readRooster(
            roosterName.roosterTxT,
            roosterName.playerIndex,
            roosterName.roosterIndex
          )
        )
      ),
    { dispatch: false }
  );

  createUnitUI$ = createEffect(
    // only Top Component for now
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.createUnitUI),
        tap((unitData) =>
          this.visualsService.createUnitUI(
            'UnitUITopComponent',
            unitData.playerIndex,
            unitData.ID
          )
        )
      ),
    { dispatch: false }
  );

  increaseQuantity$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.increaseQuantity),
        tap((unit) =>
          this.visualsService.createUnitData(unit.playerIndex, unit.ID)
        )
      ),
    { dispatch: false }
  );

  decreaseQuantity$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.decreaseQuantity),
        tap((unit) =>
          this.visualsService.createUnitData(unit.playerIndex, unit.ID)
        )
      ),
    { dispatch: false }
  );

  setFileLength$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.setFileLength),
        tap((unit) =>
          this.visualsService.createUnitData(unit.playerIndex, unit.ID)
        )
      ),
    { dispatch: false }
  );

  deleteUnit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.deleteUnit),
        tap((unit) => this.visualsService.deleteUnit(unit.ID))
      ),
    { dispatch: false }
  );
}
