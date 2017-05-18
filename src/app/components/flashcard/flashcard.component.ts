import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  id: any;
  flashcard: any;
  imageUrl: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getFlashcardDetails(this.id).subscribe(flashcard => {
      this.flashcard = flashcard;

      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(this.flashcard.path);
      storageRef.child(this.flashcard.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });

    });
  }

  onDeleteClick() {
    this.firebaseService.deleteFlashcard(this.id);

    this.router.navigate(['/flashcards']);
  }

}
