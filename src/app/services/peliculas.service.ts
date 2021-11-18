import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of} from 'rxjs';
import { CarteleraResponse,Movie } from '../interfaces/cartelera-response';
import {catchError, map,tap} from 'rxjs/operators'
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsReponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})

export class PeliculasService {

  private baseUrl:string = "https://api.themoviedb.org/3";
  private carteleraPage = 1;
  public cargando:boolean = false

  constructor(private http: HttpClient) { }

  get params(){
    return{
      api_key:'APIKEY',
      language:'es-ES',
      page:this.carteleraPage
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]>{

    if(this.cargando){
      // Si esta cargando, devolvemos un arreglo vacio para no hacer una llamada de nuevo a la api
      return of([]);
    }
    this.cargando=true;


    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
      params:this.params
    }).pipe(
      map((resp)=>resp.results),
      tap(res=>{
        this.carteleraPage+=1;
        this.cargando = false;
      })
    )
  }


  buscarPeliculas(pTexto:string){
    /*     https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false */

   /*  aqui necesitamos cambiar el numero de la pagina,y añadir la query
   asi que desestructuramos params y modificamos lo que necesitamos */
    const params = {...this.params, page: 1, query:pTexto};
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
      map(resp=>resp.results)
    )
  }



  getPeliculaDetalle(id:string){
        /* 
https://api.themoviedb.org/3/movie/580489?api_key=e3e898fc77f1bc2dbf5e5960e0f745fa&language=es-ES */
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`,{
      params:this.params
    }).pipe(
      catchError(err=> of(null))
    )
  }

  getCast(id:string):Observable<Cast[]>{

return this.http.get<CreditsReponse>(`${this.baseUrl}/movie/${id}/credits`,{
  params:this.params
}).pipe(
  map(resp=>resp.cast),
  catchError(err=> of([]))
)
}
}
