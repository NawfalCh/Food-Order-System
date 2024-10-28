import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungComponent } from './bestellung.component';

describe('BestellungComponent', () => {
  let component: BestellungComponent;
  let fixture: ComponentFixture<BestellungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestellungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
