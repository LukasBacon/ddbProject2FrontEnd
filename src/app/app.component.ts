import { Component } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { Vyucujuci} from './entities/vyucujuci';
import { Technologia } from './entities/technologia'
import { TematickyOkruh } from './entities/tematicky_okruh'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Odporúčač predmetov pre AIN';
  public vyucujuci = [];
  public technologie = [];
  public tematickeOkruhy = [];

  constructor(private preferencesService : PreferencesService) { } 

  ngOnInit(){
  	this.preferencesService.getVyucujuci()
  			.subscribe((data : Vyucujuci[]) => this.vyucujuci = data);
   	this.preferencesService.getTechnologie()
  			.subscribe((data : Technologia[]) => this.technologie = data);
   	this.preferencesService.getTematickeOkruhy()
  			.subscribe((data : TematickyOkruh[]) => this.tematickeOkruhy = data);
  }
}
