import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Predmet } from './entities/predmet';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root'
})

/**
* Sluzba, ktora sa stara o komunikaciu s backendom ohladom clingo funkcii.
*/
export class ClingoService {

  constructor(private http: HttpClient) { }

  /**
  * Post metodov posle preferencie a ziska odpoved - predmety zodpovedajuce preferenciam.
  */
  public filter( vyucujuciSelected : number[],
          technologieSelected : number[],
          tematickeOkruhySelected : number[],
          celkoveHodnotenie : number,
          narocnost : number,
          zaujimavost : number ) : Observable<Predmet[]> {
    let data = [vyucujuciSelected, technologieSelected, tematickeOkruhySelected,
                celkoveHodnotenie, narocnost, zaujimavost];
    return this.http.post<Predmet[]>( Settings.backendUri + 'clingo/filter',
                                      JSON.stringify(data),
                                      Settings.jsonHttpOptions);
  }

  /**
  * Post metodov posle idcka zvolenych predmetov a ziska odpoved - ci splnaju pravidla studijneho programu.
  */
  public check( predmetySelected : number[] ) : Observable<boolean> {
    return this.http.post<boolean>( Settings.backendUri + 'clingo/check',
                                    JSON.stringify(predmetySelected),
                                    Settings.jsonHttpOptions);
  }

}
