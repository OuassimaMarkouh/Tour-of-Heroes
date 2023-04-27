import { Component, OnInit } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]>|undefined;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.heroService.getHeroes().pipe(
      delay(600),
      map(heroes => heroes.slice(1, 5))
    );
  }
}
