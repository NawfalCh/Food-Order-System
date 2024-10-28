import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerKonfigDialogComponent } from './burger-konfig-dialog.component';

describe('BurgerKonfigDialogComponent', () => {
  let component: BurgerKonfigDialogComponent;
  let fixture: ComponentFixture<BurgerKonfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BurgerKonfigDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurgerKonfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
