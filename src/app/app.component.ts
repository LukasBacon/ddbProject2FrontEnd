import { Component } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { Vyucujuci} from './entities/vyucujuci';
import { Technologia } from './entities/technologia';
import { TematickyOkruh } from './entities/tematicky-okruh';
import { Predmet } from './entities/predmet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Odporúčač predmetov pre AIN';
  public vyucujuci : Vyucujuci[] = [];
  public technologie : Technologia[] = [];
  public tematickeOkruhy : TematickyOkruh[] = [];
  public celkoveHodnotenie = 0;
  public narocnost = 0;
  public zaujimavost = 0;

  public predmetyFiltred : Predmet[] = [];

  constructor(private preferencesService : PreferencesService) { }

  ngOnInit(){
  	this.preferencesService.getVyucujuci()
  			.subscribe((data : Vyucujuci[]) => this.vyucujuci = data);
   	this.preferencesService.getTechnologie()
  			.subscribe((data : Technologia[]) => this.technologie = data);
   	this.preferencesService.getTematickeOkruhy()
  			.subscribe((data : TematickyOkruh[]) => this.tematickeOkruhy = data);
  }

  public filter(){
    let vyucujuciSelected : number[] = this.filterSelected(this.vyucujuci);
    let technologieSelected : number[] = this.filterSelected(this.technologie);
    let tematickeOkruhySelected : number[] = this.filterSelected(this.tematickeOkruhy);

    this.preferencesService.filter(
      vyucujuciSelected,
      technologieSelected,
      tematickeOkruhySelected,
      this.celkoveHodnotenie,
      this.narocnost,
      this.zaujimavost
    ).subscribe((data : Predmet[]) => { this.predmetyFiltred = data; console.log(data); });
  }

  private filterSelected(list) : number[]{
    let result = [];
    list.forEach(function(obj){
      if (obj.selected){
        result.push(obj.id);
      }
    });
    return result;
  }

  public predmetToRowString(predmet : Predmet) : String{
    return predmet.kod + " - " + predmet.nazov;
  }
}
