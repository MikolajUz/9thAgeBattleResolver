import { Component } from '@angular/core';
import { ArmyService } from '../services/army.service';

@Component({
  selector: 'app-get-rooster',
  templateUrl: './get-rooster.component.html',
  styleUrls: ['./get-rooster.component.scss'],
})
export class GetRoosterComponent {
  validFile = false;

  constructor(private armyService: ArmyService) {}

  onDragOver(event: any) {
    event.preventDefault();
  }
  onDropSuccess(event: any) {
    event.preventDefault();
    if (event.dataTransfer.files.length < '2')
      this.onFileChange(event.dataTransfer.files);
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
          this.armyService.readRooster(reader.result);
      });
      reader.readAsText(files[0]);
    } else this.validFile = true;
  }
}
