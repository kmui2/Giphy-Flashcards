import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.css']
})
export class AddFlashcardComponent implements OnInit {
  word:any;
  translation:any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit(){
    let flashcard = {
      word: this.word,
      translation: this.translation
    }

    this.firebaseService.addFlashcard(flashcard);

    this.router.navigate(['flashcards']);
  }

}
