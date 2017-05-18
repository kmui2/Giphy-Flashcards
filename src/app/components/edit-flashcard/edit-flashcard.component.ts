import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrls: ['./edit-flashcard.component.css']
})
export class EditFlashcardComponent implements OnInit {
  id;
  word;
  translation;

  constructor(
    private firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getFlashcardDetails(this.id).subscribe(flashcard => {
      this.word = flashcard.word;
      this.translation = flashcard.translation;
    });
  }

  onEditSubmit(){
    let flashcard = {
        word: this.word,
        translation: this.translation
    }

    this.firebaseService.updateFlashcard(this.id, flashcard);

    this.router.navigate(['/flashcards']);
  }

}
