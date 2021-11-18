import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  movies:Movie[]=[]
  texto:string='';
  constructor(private activatedRoute:ActivatedRoute, private peliculasService:PeliculasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params.texto);
      this.texto=params.texto
      // LLamar al servicio
      this.peliculasService.buscarPeliculas(params.texto).subscribe(movies=>{
        this.movies=movies
        console.log(movies)
      })
    })
  }

}
