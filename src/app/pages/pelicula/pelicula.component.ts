import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie:MovieResponse | undefined;
  public cast:Cast[] =[];
  constructor(
      private activatedRoute:ActivatedRoute,
      private peliculasService:PeliculasService,
      private location:Location,
      private router:Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id)
    ]).subscribe( ([movie,cast]) =>{

      if(!movie){
        this.router.navigateByUrl('/home');
        return;
      }

      this.movie=movie;
      this.cast= cast.filter(actor=>actor.profile_path != null);
    })

   /*  this.peliculasService.getPeliculaDetalle(id).subscribe(movie=>{
      if(!movie){
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie=movie
    });

    this.peliculasService.getCast(id).subscribe(cast=>{
      //  this.cast=cast
      this.cast=cast.filter(actor=>actor.profile_path != null)
    }); */

  }

  onRegresar(){
    //Esto te hace ir a la pantalla anterior del usuario
    this.location.back();
  }
}
