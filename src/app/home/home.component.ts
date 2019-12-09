import { Component, OnInit, HostListener } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TestService } from '../test.service';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  //In chrome and some browser scroll is given to body tag
  let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  let max = document.documentElement.scrollHeight;
  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
   if(pos == max )   {
   //Do your action here
   this.getMoreGifs();
   }
  }
  id: number;
  values: any;
  value: any;
  username: any;
  searchWord: string;
  offSet: number;
  limit: string;
  gifs: any[];
  endGif: boolean;
  constructor(
    private router: Router,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.offSet=0;
    this.endGif = false;
  }



  getValues() {
    this.testService.getValues().subscribe(values => this.values = values);
    console.log(this.values);
  }
  getValue() {
    this.testService.getValue(this.id).subscribe(value => this.value = value);
  }
  getCategories() {
    this.testService.getCategories().subscribe(values => this.values = this.value);
  }
  getGifs() {
    this.offSet=0;
    this.limit="20";
    this.searchWord = this.searchWord == "" ? undefined : this.searchWord;
    this.testService.getGifs(this.searchWord, this.limit, this.offSet).subscribe(gif => {
    debugger
    console.log(gif);
    this.gifs = gif.data;
      
    });
    
  }
  getMoreGifs(){
    this.offSet = this.offSet +20;
    this.testService.getGifs(this.searchWord, this.limit, this.offSet).subscribe(gif => {
      console.log(gif);
      debugger
      if(this.gifs!=null){
        gif.data.forEach(obj => 
          this.gifs.push(obj))
      }
        else
          this.gifs = gif.data;

          if(gif.data.length==0)
            this.endGif=true;
    });
    
  }
}