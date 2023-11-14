import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  RoosterStoreActions,
  RoosterStoreSelectors,
} from 'src/app/players/current-rooster-store/current-rooster.index';

@Component({
  selector: 'app-get-rooster',
  templateUrl: './get-rooster.component.html',
  styleUrls: ['./get-rooster.component.scss'],
})
export class GetRoosterComponent {
  @Input() player!: string;
  validFile = false;
  constructor(private store: Store) {}

  onDragOver(event: any) {
    event.preventDefault();
  }
  onDropSuccess(event: any) {
    event.preventDefault();
    if (event.dataTransfer.files.length < '2') {
      this.onFileChange(event.dataTransfer.files);
    }
  }
  onChange(event: any) {
    this.onFileChange(event.target.files);
  }

  isTxt(name: string) {
    return name.slice(-4) === '.txt';
  }

  private onFileChange(files: any) {
    if (this.isTxt(files[0].name)) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string')
          this.store.dispatch(
            RoosterStoreActions.requestRoosterLoad({
              roosterTxT: reader.result,
              player: this.player,
            })
          );
      });
      reader.readAsText(files[0]);
    } else this.validFile = true;
  }
}
