
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getComponentViewByIndex } from '@angular/core/src/render3/util';
import { AlertController } from '@ionic/angular';

interface Movie {
  title: string;
  id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  movies: Movie[] = [];

  constructor(
    private readonly router: Router,
    public alertController: AlertController
  ) {
  }
  getMovie(search: string): void {
    this.movies = search.length > 2 ? [{title: search, id: '1'}] : [];
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
}
