import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {environment} from "../../../environments/environment";
import {Pixaby} from "../interfaces/pixaby";

@Injectable({
  providedIn: 'root'
})
export class PixabyService {

  constructor(
    public http: HttpClient
  ) { }

  getPicture(query: string) {
    return firstValueFrom(this.http.get<Pixaby>(`${environment.apiUrl}${query}`));
  }
}
