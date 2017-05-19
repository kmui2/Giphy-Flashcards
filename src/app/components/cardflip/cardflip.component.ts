import { Component, OnInit, trigger, state, style, transition, animate, Input } from '@angular/core';

@Component({
  selector: 'app-cardflip',
  templateUrl: './cardflip.component.html',
  styleUrls: ['./cardflip.component.css'],
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
export class CardflipComponent {
  @Input() flashcard;
  flip: string = 'inactive';
  constructor() {}

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

}