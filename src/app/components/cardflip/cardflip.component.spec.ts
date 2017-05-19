/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardflipComponent } from './cardflip.component';

describe('CardflipComponent', () => {
  let component: CardflipComponent;
  let fixture: ComponentFixture<CardflipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardflipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardflipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
