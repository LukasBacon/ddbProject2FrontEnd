import { Component } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { ClingoService } from './clingo.service';
import { Vyucujuci} from './entities/vyucujuci';
import { Technologia } from './entities/technologia';
import { TematickyOkruh } from './entities/tematicky-okruh';
import { Predmet } from './entities/predmet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
* Hlavny controller aplikacie.
*/
export class AppComponent {
  public title = 'Odporúčač predmetov pre AIN';
  public vyucujuci : Vyucujuci[] = [];
  public technologie : Technologia[] = [];
  public tematickeOkruhy : TematickyOkruh[] = [];
  public celkoveHodnotenie = 0;
  public narocnost = 10;
  public zaujimavost = 0;

  public predmetyFiltred : Predmet[] = [];
  public predmetFiltredHoverer : Predmet = null;
  public predmetySelected : Predmet[] = [];
  public ok : boolean = false;

  constructor(private preferencesService : PreferencesService,
              private clingoService : ClingoService) { }
  /**
  * NAcitanie dat pri inicializacii triedy.
  */
  ngOnInit(){
  	this.preferencesService.getVyucujuci()
  			.subscribe((data : Vyucujuci[]) => this.vyucujuci = data);
   	this.preferencesService.getTechnologie()
  			.subscribe((data : Technologia[]) => this.technologie = data);
   	this.preferencesService.getTematickeOkruhy()
  			.subscribe((data : TematickyOkruh[]) => this.tematickeOkruhy = data);
  }

  /**
  * Vyfiltruje a priradi predmety do this.predmetyFiltred podla zvolenych preferencii.
  */
  public filter(){
    let vyucujuciSelected : number[] = this.filterSelected(this.vyucujuci);
    let technologieSelected : number[] = this.filterSelected(this.technologie);
    let tematickeOkruhySelected : number[] = this.filterSelected(this.tematickeOkruhy);

    this.clingoService.filter(
      vyucujuciSelected,
      technologieSelected,
      tematickeOkruhySelected,
      this.celkoveHodnotenie,
      this.narocnost,
      this.zaujimavost
    ).subscribe((data : Predmet[]) => { this.predmetyFiltred = this.order(data); });
  }

  /**
  * Vrati pole idciek z pola objektov list, kde object ma selected true.
  */
  private filterSelected(list) : number[]{
    let result : number[] = [];
    list.forEach(function(obj){
      if (obj.selected){
        result.push(obj.id);
      }
    });
    return result;
  }

  /**
  * Vrati spravu o kontrole zvolenych predmetov.
  */
  public getMessage() : String {
    if (this.ok){
      return "OK";
    }
    return "Not OK";
  }

  /**
  * Vrati cestu k obrazku podla kontroly zvolenych predmetov.
  */
  public getImagePath() : String{
    if (this.ok){
      return "assets/ok.png";
    }
    return "assets/notok.png";
  }

  /**
  * Premiestni predmety z filtrovanych do zvolenych.
  */
  public addPredmet(predmet : Predmet) {
    const index = this.indexOfPredmet(this.predmetySelected, predmet);
    if (index <= -1) {
      this.predmetySelected.push(predmet);
      this.check();
    }
    const index2 = this.indexOfPredmet(this.predmetyFiltred, predmet);
    this.predmetyFiltred.splice(index2, 1);
  }

  /**
  * Odstrani predmet zo zvolenych.
  */
  public removePredmet(predmet : Predmet) {
    const index = this.indexOfPredmet(this.predmetySelected, predmet);
    if (index > -1) {
      this.predmetySelected.splice(index, 1);
      this.check();
    }
  }

  /**
  * Do zvolenych predmetov premiestni vsetky A-ckove predmey z filtrovanych.
  */
  public chooseAllA(){
    let predmetyToRemove : Predmet[] = [];
    for (let obj of this.predmetyFiltred){
      if (obj.typ == "A"){
        const index = this.indexOfPredmet(this.predmetySelected, obj);
        if (index <= -1) {
          predmetyToRemove.push(obj);
          this.predmetySelected.push(obj);
        }
      }
    };
    for (let obj of predmetyToRemove){
      const index = this.indexOfPredmet(this.predmetyFiltred, obj);
      if (index > -1){
        this.predmetyFiltred.splice(index, 1);
      }
    };
    this.check();
  }

  /**
  * Vycisti zvolene predmety.
  */
  public clear(){
    this.predmetySelected = [];
    this.check();
  }

  /**
  * Vrati sucet kreditov zoznamu predmetov.
  */
  public kreditSum(list : Predmet[]) : number {
    let result : number = 0;
    for (let predmet of list){
      result += predmet.kredit;
    }
    return result;
  }

  private indexOfPredmet(list : Predmet[], predmet : Predmet) : number{
    let result : number = -1;
    let index : number = 0;
    list.forEach(function(obj : Predmet){
      if (obj.id == predmet.id){
        result = index;
      }
      index += 1;
    })
    return result;
  }

  private check() {
    this.predmetySelected = this.order(this.predmetySelected);
    let predmetySelectedIds : number[] = [];
    this.predmetySelected.forEach(function(predmet : Predmet){
      predmetySelectedIds.push(predmet.id);
    })
    this.clingoService.check(predmetySelectedIds)
                      .subscribe((result : boolean) => {console.log(result); this.ok = result});
  }

  private order(list : Predmet[]) : Predmet[] {
    return list.sort((p1, p2) => this.compareTypeOfPredmets(p1, p2))
  }

  private compareTypeOfPredmets(predmet1 : Predmet, predmet2 : Predmet) : number {
    if (predmet1.typ == predmet2.typ){
      return 0;
    }
    else if (predmet1.typ < predmet2.typ){
      return -1;
    }
    return 1;
  }
}
