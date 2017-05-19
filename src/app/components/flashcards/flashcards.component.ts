import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class FlashcardsComponent implements OnInit {
  flashcards: any;
  title = 'Welcome to GiphySearch';
  link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';
  giphies = [];
  selectedGif: any;
  
  detailed = false;

  flip: string = 'inactive';
  toggleMessage: string = "Switch to Detailed View";

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http) { }

  performTranslationSearch(flashcard): void {
    var apiLink = this.link + flashcard.translation;

    this.http.request(apiLink)
      .subscribe((res: Response) => {
        this.giphies = res.json().data;
        console.log(this.giphies);
        flashcard.selectedGif = this.giphies[Math.floor(Math.random() * this.giphies.length)];
        console.log("This is selected: " + flashcard.selectedGif);
      });
  }
  
  toggleDetailedView(): void {
    this.detailed = (this.detailed == false) ? true : false;
    if(this.detailed){
      this.toggleMessage = "Switch to Card View";
    }
    else {
      this.toggleMessage = "Switch to Detailed View";
    }
  }

  ngOnInit() {
    this.firebaseService.getFlashcards().subscribe(flashcards => {
      console.log(flashcards);
      this.flashcards = flashcards;
      for (let f of this.flashcards) {
        this.performTranslationSearch(f);
      }
    });
  }


  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
}
