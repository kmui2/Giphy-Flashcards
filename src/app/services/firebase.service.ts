import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  flashcards: FirebaseListObservable<any[]>;
  flashcard: FirebaseObjectObservable<any>;
  listingFolder: any;
  flashcardFolder: any;

  constructor(private af: AngularFire) {
    this.listingFolder = 'listingimages';
    this.flashcardFolder = 'flashcardimages';
    this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>;
    this.flashcards = this.af.database.list('/flashcards') as FirebaseListObservable<Flashcard[]>;
  }

  getListings(){
    return this.listings;
  }

  getFlashcards(){
    return this.flashcards;
  }

  getListingDetails(id){
    this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>
    return this.listing;
  }

  getFlashcardDetails(id){
    this.flashcard = this.af.database.object('/flashcards/'+id) as FirebaseObjectObservable<Flashcard>;
    return this.flashcard;
  }

  addListing(listing){
    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.listingFolder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);
      });
    }
  }

  addFlashcard(flashcard){
    // let storageRef = firebase.storage().ref();
    // for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
    //   let path = `/${this.flashcardFolder}/${selectedFile.name}`;
    //   let iRef = storageRef.child(path);
    //   iRef.put(selectedFile).then((snapshot) => {
    //     flashcard.image = selectedFile.name;
    //     flashcard.path = path;
    //     return this.flashcards.push(flashcard);
    //   });
    // }
    // let path = `/${this.flashcardFolder}/${selectedFile.name}`;
    return this.flashcards.push(flashcard);
  }

  updateListing(id, listing){
    return this.listings.update(id, listing);
  }

  updateFlashcard(id, flashcard){
    return this.flashcards.update(id, flashcard);
  }

  deleteListing(id){
    return this.listings.remove(id);
  }

  deleteFlashcard(id){
    return this.flashcards.remove(id);
  }

}

interface Listing{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  city?:string;
  owner?:string;
  bedrooms?:string;
}
interface Flashcard{
  $key?:string;
  word?:string;
  translation?:string;
  image?:string;
}
