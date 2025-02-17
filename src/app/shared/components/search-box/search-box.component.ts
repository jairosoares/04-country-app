import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncerSubscription?: Subscription;
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  onValue = new EventEmitter<string>();

  @Output()
  onDebouncer = new EventEmitter<string>();

  ngOnInit(): void {
    console.log("SearchBoxComponent.ngOnInit - initialValue:", this.initialValue);
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => {
      this.onDebouncer.emit(value);
    })
  }

  // limpar as subscricoes da memoria
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  onKeyPress(value: string): void {
    this.debouncer.next(value);
  }

  // deprecated
  emitValue(value: string) {
    this.onValue.emit(value);
  }

}
