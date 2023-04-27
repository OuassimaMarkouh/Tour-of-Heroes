import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  hero$: Observable<Hero> | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.hero$ = this.heroService.getHero(id).pipe(
      tap((hero) => {
        this.hero = hero;
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.hero$ = this.heroService
        .updateHero(this.hero)
        .pipe(tap(() => this.goBack()));
    }
  }
}
