import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoosterStoreActions } from './current-rooster.index';
import { CurrentRoosterService } from 'src/app/army/services/current-rooster.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class currentRoosterStoreEffects {
  constructor(
    private roosterService: CurrentRoosterService,
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
}
