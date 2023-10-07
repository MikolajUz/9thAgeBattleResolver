import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, withNoXsrfProtection } from '@angular/common/http';
import { ArmyAPI } from '../interfaces/armyAPI.interface';
import { map } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';
import { readyUnit } from '../interfaces/rooster.interface';
import { Characteristics } from '../interfaces/characteristics.interface';
import { ArmyRoosterAPI } from '../interfaces/armyRoosterAPI.interface';

@Injectable({
  providedIn: 'root',
})
export class ArmyService {
  constructor(private http: HttpClient) {}

  url = 'https://www.9thbuilder.com/api/v1/ninth_age/armies/207';

  getArmy(): Observable<Unit[]> {
    let temp = this.http.get<ArmyAPI>(this.url).pipe(
      map((ApiData) => {
        console.log(ApiData);
        return ApiData.units.filter((unit) => !unit.is_mount);
      })
    );

    return temp;
  }

  getUnit(name: string): Observable<Unit | undefined> {
    let temp = this.http.get<ArmyAPI>(this.url).pipe(
      map((ApiData) => {
        let temp2 = ApiData.units.find((unit) => unit.name === name);
        //console.log('getUnit=', temp2);
        return temp2;
      })
    );
    return temp;
  }

  getRoosterUnit(name: string): Observable<readyUnit | undefined> {
    let temp = this.http.get<ArmyRoosterAPI>(this.url).pipe(
      map((ApiData) => {
        //console.log('getUnit=', ApiData);
        let temp2 = ApiData.units.find((unit) => unit.name === name);
        return temp2;
      }),
      map((unit) => unit?.carac)
    );
    return temp;
  }

  // Observable<readyUnit | undefined[]>

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

    let roosterArray1: Observable<readyUnit | undefined[]>;

    wordsArray.forEach((line, index) => {
      if (line[2]) {
        console.log(line[2]);
        let unit = this.getRoosterUnit(line[2]).pipe(
          map((elem) => {
            if (elem) {
              elem.pts = line[0];
              elem.quantity = line[1];
              elem.name = line[2];
              let optionsArray: string[] = [];
              line.forEach((elem, index) => {
                if (index > 2) optionsArray.push(line[index]);
              });
              elem.options = optionsArray;
            }

            return elem;
          }),
          tap((output2) => console.log('roosterTyp?=', output2))
        );
        unit.subscribe((elem) => elem);
        //  roosterArray1.subscribe((elem1) =>{
        //   unit.subscribe((elem) =>
        //   {
        //     // elem1.push(elem)
        //     return elem
        //   } )

        // return elem1
        // })
      }
    });
    //roosterArray1.push(unit);
    //unit.subscribe((elem) => elem);
    // return roosterArray1;
  }
}

//console.log(unit);
