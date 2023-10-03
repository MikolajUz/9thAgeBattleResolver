import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArmyAPI } from '../interfaces/armyAPI.interface';
import { map } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';
import { getNumberOfCurrencyDigits } from '@angular/common';

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
        let temp2=ApiData.units.find((unit) => unit.name === name);
        console.log(temp2)
        return temp2
      })
    );
    return temp;
  }
}
