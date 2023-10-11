import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { readyUnit } from '../interfaces/rooster.interface';
import { ArmyRoosterAPI } from '../interfaces/armyRoosterAPI.interface';
import { Store } from '@ngrx/store';
import { RoosterStoreActions } from 'src/app/root-store/current-rooster-store/current-rooster.index';

@Injectable({
  providedIn: 'root',
})
export class CurrentRoosterService {
  constructor(private http: HttpClient, private store: Store) {}

  url = 'https://www.9thbuilder.com/api/v1/ninth_age/armies/207';

  getRoosterUnit(name: string): Observable<readyUnit | undefined> {
    return this.http.get<ArmyRoosterAPI>(this.url).pipe(
      map((ApiData) => ApiData.units.find((unit) => unit.name === name)),
      map((unit) => unit?.carac)
    );
  }

  readRooster(rooster: string): void {
    const roosterArray = (rooster: string) => {
      let correctRooster = rooster.replaceAll('-', ',');
      let lineArray = correctRooster.split('\n');
      let wordsArray: string[][] = [];

      lineArray.forEach((string) => {
        wordsArray.push(string.split(','));
      });
      wordsArray.forEach((line, index) => {
        line.forEach((word, index) => {
          line[index] = word.trim();
        });
      });
      wordsArray.forEach((line, index) => {
        if (line[1]) {
          let nameSplit = line[1].split(' ');
          if (!Number.isNaN(Number(nameSplit[0]))) {
            line.splice(1, 1, nameSplit[0]);
            line.splice(2, 0, nameSplit[1]);
          } else {
            line.splice(1, 0, '1');
          }
        }
      });

      return wordsArray;
    };

    let wordsArray = roosterArray(rooster);

    wordsArray.forEach((line) => {
      this.getRoosterUnit(line[2])
        .pipe(
          map((unit) => {
            if (unit) {
              unit.pts = line[0];
              unit.quantity = line[1];
              unit.name = line[2];
              let optionsArray: string[] = [];
              line.forEach((unit, index) => {
                if (index > 2) optionsArray.push(line[index]);
              });
              unit.options = optionsArray;
            }
            return unit;
          })
        )
        .subscribe((unit) => {
          if (unit !== undefined)
            this.store.dispatch(
              RoosterStoreActions.addReadyUnitToRooster({ nextUnit: unit })
            );
        });
    });
  }
}
