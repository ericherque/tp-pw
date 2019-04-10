
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getComponentViewByIndex } from '@angular/core/src/render3/util';
import { AlertController } from '@ionic/angular';
import { apiKey } from './../../tmdb';
import { TmplAstBoundAttribute } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Movie {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

interface TMDBReponse {
  results: Movie[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  movies: Promise<Movie[]>;

  constructor(
    private readonly router: Router,
    public alertController: AlertController,
    private readonly http: HttpClient
  ) {
  }
  getMovie(search: string): void {
    this.movies = search.length > 2 ? this.searchMovies(search) : Promise.resolve([]);
  }

  async buttonAlert() {
    const alert = await this.alertController.create({
      header: 'Random',
      message: 'This is an alert message.',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Show Details',
        }
      ]
    });

    await alert.present();
  }

  showDetails(movie: Movie): void {
    this.router.navigate(['/details'], {state: {movie}});
  }

  private async askTMDB(api: string, params: object): Promise<Movie[]> { const { results } = await this.http.get<TMDBReponse>(
    `https://api.themoviedb.org/3/${api}/movie`, { params: { api_key: apiKey, ...params } }
    ).toPromise();
      return results;
    }

  private searchMovies(search: string): Promise<Movie[]> {
    return this.askTMDB('search', {query: search});
  }
}
