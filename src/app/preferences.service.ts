import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';
import { Vyucujuci } from './entities/vyucujuci';
import { Technologia } from './entities/technologia';
import { TematickyOkruh } from './entities/tematicky-okruh';
import { Predmet } from './entities/predmet';

@Injectable({
  providedIn: 'root'
})

export class PreferencesService {

	private backendUri = 'http://localhost:8080/ddbProject2BackEnd/rest/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

	constructor(private http: HttpClient) { }

  getVyucujuci() : Observable<Vyucujuci[]>{
  	return this.http.get<Vyucujuci[]>(this.backendUri + 'vyucujuci/all');
  }

  getTechnologie() : Observable<Technologia[]>{
  	return this.http.get<Technologia[]>(this.backendUri + 'technologia/all');
  }

  getTematickeOkruhy() : Observable<TematickyOkruh[]>{
  	return this.http.get<TematickyOkruh[]>(this.backendUri + 'tematicky_okruh/all');
  }

  filter( vyucujuciSelected : number[],
          technologieSelected : number[],
          tematickeOkruhySelected : number[],
          celkoveHodnotenie : number,
          narocnost : number,
          zaujimavost : number ) : Observable<Predmet[]> {
    let data = [vyucujuciSelected, technologieSelected, tematickeOkruhySelected,
                celkoveHodnotenie, narocnost, zaujimavost];
    return this.http.post<Predmet[]>(this.backendUri + "clingo/filter", JSON.stringify(data), this.httpOptions);
  }

}
