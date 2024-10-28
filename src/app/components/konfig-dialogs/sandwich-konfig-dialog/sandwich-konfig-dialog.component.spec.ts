import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichKonfigDialogComponent } from './sandwich-konfig-dialog.component';

describe('SandwichKonfigDialogComponent', () => {
  let component: SandwichKonfigDialogComponent;
  let fixture: ComponentFixture<SandwichKonfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SandwichKonfigDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandwichKonfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
