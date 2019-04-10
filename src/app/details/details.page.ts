import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../home/home.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  movie: Movie;

  constructor(
    private readonly router: Router
  ) {
    this.movie = this.router.getCurrentNavigation().extras.state.movie;
    }

  ngOnInit() {
  }

  buttonBack() {
    this.router.navigate(['/home']);
  }
}
