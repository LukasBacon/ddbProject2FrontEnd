import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';
import { Vyucujuci } from './entities/vyucujuci'
import { Technologia } from './entities/technologia'
import { TematickyOkruh } from './entities/tematicky-okruh'

@Injectable({
  providedIn: 'root'
})

export class PreferencesService {

	private backendUri = 'http://localhost:8080/ddbProject2BackEnd/rest/';

	constructor(private http: HttpClient) {
    const httpOptions = {
    	headers: new HttpHeaders({
    		'Content-Type': 'application/json'
    	})
    }
	}

  getVyucujuci() : Observable<Vyucujuci[]>{
  	return this.http.get<Vyucujuci[]>(this.backendUri + 'vyucujuci/all');
  }

  getTechnologie() : Observable<Technologia[]>{
  	return this.http.get<Technologia[]>(this.backendUri + 'technologia/all');
  }

  getTematickeOkruhy() : Observable<TematickyOkruh[]>{
  	return this.http.get<TematickyOkruh[]>(this.backendUri + 'tematicky_okruh/all');
  }

}
