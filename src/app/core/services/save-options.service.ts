import { Injectable } from '@angular/core';
import {optionList} from "../interfaces/pixaby";

@Injectable({
  providedIn: 'root'
})
export class SaveOptionsService {
  option: optionList;
  pageIndex: number;

  constructor() { }

  setOptions(options: optionList) {
    this.option = options;
  }

  getOptions() {
    return this.option;
  }

  setPage(page: number) {
    this.pageIndex = page;
  }

  getPage() {
    return this.pageIndex;
  }
}
