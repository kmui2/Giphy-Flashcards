import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { EditFlashcardComponent } from './components/edit-flashcard/edit-flashcard.component';
import { AddFlashcardComponent } from './components/add-flashcard/add-flashcard.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';

export const firebaseConfig = {
    apiKey: "AIzaSyAKue96FibAqWFcQ53_Ya8neqOSmZu4K7E",
    authDomain: "proplistings-5dcf0.firebaseapp.com",
    databaseURL: "https://proplistings-5dcf0.firebaseio.com",
    projectId: "proplistings-5dcf0",
    storageBucket: "proplistings-5dcf0.appspot.com",
    messagingSenderId: "1078585714037"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'listings', component:ListingsComponent},
  {path: 'flashcards', component:FlashcardsComponent},
  {path:'listing/:id', component:ListingComponent},
  {path:'flashcard/:id', component:FlashcardComponent},
  {path: 'add-listing', component:AddListingComponent},
  {path: 'add-flashcard', component:AddFlashcardComponent},
  {path:'edit-listing/:id', component:EditListingComponent},
  {path: 'edit-flashcard/:id', component:EditFlashcardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    EditFlashcardComponent,
    AddFlashcardComponent,
    FlashcardComponent,
    FlashcardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
