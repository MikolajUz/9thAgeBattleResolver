import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs';
import { Unit } from '../../army/interfaces/unit.interface';

import { Store } from '@ngrx/store';
import { RoosterStoreActions } from '../rooster-store/rooster.index';
import { FacadeService } from 'src/app/facade/facade.service';
import { ArmyStoreSelectors } from 'src/app/army/army-store/army.index';

@Injectable({
  providedIn: 'root',
})
export class RoosterService {
  constructor(private store: Store, private facade: FacadeService) {}

  url = 'https://www.9thbuilder.com/api/v1/ninth_age/armies/207';

  getRoosterUnit(name: string): Observable<Unit | undefined> {
    //this.facade.getArmyUnit(name);
    return this.store.select(ArmyStoreSelectors.selectArmyUnit(name));
  }

  readRooster(
    rooster: string,
    playerIndex: number,
    roosterIndex: number
  ): void {
    const roosterArray = (rooster: string) => {
      let correctRooster = rooster.replaceAll('-', ',');
      let lineArray = correctRooster.split('\n');
      let wordsArray: string[][] = [];

      lineArray.forEach((string) => {
        wordsArray.push(string.split(','));
      });
      wordsArray.forEach((line) => {
        line.forEach((word, index) => {
          line[index] = word.trim();
        });
      });

      wordsArray.forEach((line, index) => {
        if (line[1]) {
          let nameSplit = line[1].split(' ');
          if (!Number.isNaN(Number(nameSplit[0]))) {
            line.splice(1, 1, nameSplit[0]);
            nameSplit.shift();
            let unitName = nameSplit.toString();
            unitName = unitName.replaceAll(',', ' ');
            line.splice(2, 0, unitName);
          } else {
            line.splice(1, 0, '1');
          }
        }
      });

      return wordsArray;
    };

    let wordsArray = roosterArray(rooster);

    wordsArray.forEach((line, index) => {
      this.getRoosterUnit(line[2])
        .pipe(
          map((unit) => {
            if (unit) {
              unit = { ...unit };
              unit.ID = index;
              unit.points = line[0];
              unit.quantity = Number(line[1]);
              unit.name = line[2];
              unit.wounds = 0;
              unit.fileLength = 1;
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
          if (unit !== undefined) {
            this.store.dispatch(
              RoosterStoreActions.addUnitToRooster({
                nextUnit: unit,
                playerIndex: playerIndex,
                roosterIndex: roosterIndex,
              })
            );
          }
        });
    });
  }
}
