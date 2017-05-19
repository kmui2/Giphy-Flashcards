import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  title = 'Welcome to GiphySearch';
  link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';
  giphies = [];
  selectedGif: any;

  id: any;
  flashcard: any;
  imageUrl: any;
  

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) { }

  performSearch(searchTerm: string): void {
    var apiLink = this.link + searchTerm;

    this.http.request(apiLink)
      .subscribe((res: Response) => {
        this.giphies = res.json().data;
        console.log(this.giphies);
        this.selectedGif = this.giphies[Math.floor(Math.random()*this.giphies.length)];
        console.log("This is selected: " + this.selectedGif);
      });
  }
  performTranslationSearch(): void {
    var apiLink = this.link + this.flashcard.translation;

    this.http.request(apiLink)
      .subscribe((res: Response) => {
        this.giphies = res.json().data;
        console.log(this.giphies);
        this.selectedGif = this.giphies[Math.floor(Math.random()*this.giphies.length)];
        console.log("This is selected: " + this.selectedGif);
      });
  }
  


  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getFlashcardDetails(this.id).subscribe(flashcard => {
      this.flashcard = flashcard;

      // let storageRef = firebase.storage().ref();
      // let spaceRef = storageRef.child(this.flashcard.path);
      // storageRef.child(this.flashcard.path).getDownloadURL().then((url) => {
      //   // Set image url
      //   this.imageUrl = url;
      // }).catch((error) => {
      //   console.log(error);
      // });

    });
    console.log(this.flashcard.translation);
    // this.performSearch(this.flashcard.translation);
    this.performTranslationSearch();
  }

  onDeleteClick() {
    this.firebaseService.deleteFlashcard(this.id);

    this.router.navigate(['/flashcards']);
  }

}
