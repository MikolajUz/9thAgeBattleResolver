import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoosterStoreActions } from './current-rooster.index';
import { CurrentRoosterService } from 'src/app/army/services/current-rooster.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UIService } from 'src/app/UI/services/ui.service';

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
        tap((unitData) => {
          this.uiService.createUnitUI(
            unitData.quantity,
            unitData.fileLength,
            unitData.base,
            'UnitUITopComponent',
            'plrOne',
            unitData.ID
          );
        })
      ),
    { dispatch: false }
  );

  createUnitUIPlr2$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RoosterStoreActions.createUnitUIPlr2),
        tap((unitData) => {
          this.uiService.createUnitUI(
            unitData.quantity,
            unitData.fileLength,
            unitData.base,
            'UnitUiBottomComponent',
            'plrTwo',
            unitData.ID
          );
        })
      ),
    { dispatch: false }
  );
}
