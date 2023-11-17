import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  RoosterStoreActions,
} from 'src/app/players/rooster-store/rooster.index';

@Component({
  selector: 'app-rooster-loader',
  templateUrl: './rooster-loader.component.html',
  styleUrls: ['./rooster-loader.component.scss'],
})
export class RoosterLoaderComponent {
  @Input() playerIndex!: number;
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
              playerIndex: this.playerIndex,
              roosterIndex: 0,
            })
          );
      });
      reader.readAsText(files[0]);
    } else this.validFile = true;
  }
}
