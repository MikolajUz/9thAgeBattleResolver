import { Component } from '@angular/core';

@Component({
  selector: 'app-get-rooster',
  templateUrl: './get-rooster.component.html',
  styleUrls: ['./get-rooster.component.scss'],
})
export class GetRoosterComponent {
  
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

  private onFileChange(files: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      console.log(reader.result);
    });
    reader.readAsText(files[0]);
  }
}
