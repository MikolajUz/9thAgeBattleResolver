import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoosterStoreActions } from './current-rooster.index';
import { CurrentRoosterService } from '../services/current-rooster.service';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UIService } from '../services/ui.service';

@Injectable()
export class currentRoosterStoreEffects {
  constructor(
    private roosterService: CurrentRoosterService,
    private uiService: UIService,
    private action$: Actions
  ) {}

  loadRooster$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.requestRoosterLoad),
        tap((roosterName) =>
          this.roosterService.readRooster(
            roosterName.roosterTxT,
            roosterName.player
          )
        )
      ),
    { dispatch: false }
  );

  createUnitUIPlr1$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.createUnitUIPlr1),
        tap((unitData) =>
          this.uiService.createUnitUI(
            'UnitUITopComponent',
            'plrOne',
            unitData.ID
          )
        )
      ),
    { dispatch: false }
  );

  createUnitUIPlr2$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.createUnitUIPlr2),
        tap((unitData) =>
          this.uiService.createUnitUI(
            'UnitUiBottomComponent',
            'plrTwo',
            unitData.ID
          )
        )
      ),
    { dispatch: false }
  );

  increaseQuantityPlr1$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.increaseQuantityPlr1),
        tap((unit) => this.uiService.createUnitData('plrOne', unit.ID))
      ),
    { dispatch: false }
  );

  decreaseQuantityPlr1$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.decreaseQuantityPlr1),
        tap((unit) => this.uiService.createUnitData('plrOne', unit.ID))
      ),
    { dispatch: false }
  );

  setFileLengthPlr1$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.setFileLengthPlr1),
        tap((unit) => this.uiService.createUnitData('plrOne', unit.ID))
      ),
    { dispatch: false }
  );

  deleteUnitPlr1$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.deleteUnitPlr1),
        tap((unit) => this.uiService.deleteUnit(unit.ID))
      ),
    { dispatch: false }
  );
}
