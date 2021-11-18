import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit,AfterViewInit {

  @Input() movies:Movie[]=[];
  public mySwiper!: Swiper;

  constructor() { }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,
    });

  }

  ngOnInit(): void {

  }
  onSlide(pPosicion:string){
    if(pPosicion=="next"){
      this.mySwiper.slideNext() 
    }else{
      this.mySwiper.slidePrev()
    }
  }
  
}
