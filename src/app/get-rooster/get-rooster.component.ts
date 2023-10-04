import { Component } from '@angular/core';

@Component({
  selector: 'app-get-rooster',
  templateUrl: './get-rooster.component.html',
  styleUrls: ['./get-rooster.component.scss'],
})
export class GetRoosterComponent {
  validFile = false;

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
        console.log(reader.result);
      });
      reader.readAsText(files[0]);
    } else this.validFile = true;
  }
}
