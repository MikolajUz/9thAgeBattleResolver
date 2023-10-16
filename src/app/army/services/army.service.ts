import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, tap } from 'rxjs';
import { HttpClient, withNoXsrfProtection } from '@angular/common/http';
import { ArmyAPI } from '../interfaces/armyAPI.interface';
import { map } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';
import { readyUnit } from '../interfaces/rooster.interface';
import { ArmyRoosterAPI } from '../interfaces/armyRoosterAPI.interface';

@Injectable({
  providedIn: 'root',
})
export class ArmyService {
  constructor(private http: HttpClient) {}

  url = 'https://www.9thbuilder.com/api/v1/ninth_age/armies/207';

  getArmy(): Observable<Unit[]> {
    return this.http
      .get<ArmyAPI>(this.url)
      .pipe(map((ApiData) => ApiData.units.filter((unit) => !unit.is_mount)));
  }

  getUnit(name: string): Observable<Unit | undefined> {
    return this.http
      .get<ArmyAPI>(this.url)
      .pipe(map((ApiData) => ApiData.units.find((unit) => unit.name === name)));
  }

  getRoosterUnit(name: string): Observable<readyUnit | undefined> {
    return this.http.get<ArmyRoosterAPI>(this.url).pipe(
      map((ApiData) => ApiData.units.find((unit) => unit.name === name)),
      map((unit) => unit?.carac)
    );
  }

  readRooster(rooster: string): Observable<(readyUnit | undefined)[]> {
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
    let arrayTemp$ = new BehaviorSubject<(readyUnit | undefined)[]>([]);
    let arrayTemp: (readyUnit | undefined)[] = [];
    let roosterArray$!: Observable<(readyUnit | undefined)[]>;

    roosterArray$;

    wordsArray.forEach((line) => {
      this.getRoosterUnit(line[2])
        .pipe(
          map((unit) => {
            if (unit) {
              unit.pts = line[0];
              unit.quantity = Number(line[1]);
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
        .subscribe((unit) => arrayTemp$.next([unit]));
    });

    arrayTemp$.subscribe((elem) => {
      if (elem[0] !== undefined) arrayTemp.push(elem[0]);
      roosterArray$ = of(arrayTemp);
    });

    return roosterArray$;
  }
}
