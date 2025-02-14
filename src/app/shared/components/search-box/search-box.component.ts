import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  onValue = new EventEmitter<string>();

  // @ViewChild('txtInput')
  // public txtInput!: ElementRef<HTMLInputElement>;

  emitValue(value: string) {
    //const txtValue = this.txtInput.nativeElement.value;
    //this.txtInput.nativeElement.value = '';
    //this.onValue.emit(txtValue);
    this.onValue.emit(value);
  }

}
