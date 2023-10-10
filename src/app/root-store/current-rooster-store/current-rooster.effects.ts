import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoosterStoreActions } from './current-rooster.index';
import { CurrentRoosterService } from 'src/app/army/services/current-rooster.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class currentRoosterStoreEffects {
  constructor(
    private roosterService: CurrentRoosterService,
    private action$: Actions
  ) {}

  loadArmy$ = createEffect(() => {
    return this.action$.pipe(
      ofType(RoosterStoreActions.requestRoosterLoad),
      exhaustMap((roosterName) => {
        return this.roosterService.readRooster(roosterName.roosterTxT).pipe(
          map((rooster) => RoosterStoreActions.roosterLoaded({ rooster })),
          catchError(() =>
            of({ type: '[Rooster Section]  Rooster Loading Error' })
          )
        );
      })
    );
  });
}
