import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';
import { Vyucujuci } from './entities/vyucujuci';
import { Technologia } from './entities/technologia';
import { TematickyOkruh } from './entities/tematicky-okruh';
import { Predmet } from './entities/predmet';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root'
})

export class PreferencesService {

	constructor(private http: HttpClient) { }

  getVyucujuci() : Observable<Vyucujuci[]>{
  	return this.http.get<Vyucujuci[]>(Settings.backendUri + 'vyucujuci/all');
  }

  getTechnologie() : Observable<Technologia[]>{
  	return this.http.get<Technologia[]>(Settings.backendUri + 'technologia/all');
  }

  getTematickeOkruhy() : Observable<TematickyOkruh[]>{
  	return this.http.get<TematickyOkruh[]>(Settings.backendUri + 'tematicky_okruh/all');
  }
  
}
