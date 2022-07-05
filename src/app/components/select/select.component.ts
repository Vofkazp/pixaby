import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {selectList} from "../../core/interfaces/pixaby";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectComponent,
    multi: true,
  }]
})
export class SelectComponent implements OnInit {
  @Input() options: selectList[];
  @Input() label: string;
  value = '';

  constructor() { }

  ngOnInit(): void {
  }

  onChange = (value: any) => {};

  onTouched = () => {};

  selectItem(item: selectList) {
    this.value = item.name;
    this.onChange(item.value);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  writeValue(value: string) {
    this.value = this.options.find(r=>r.value === value)!.name;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
