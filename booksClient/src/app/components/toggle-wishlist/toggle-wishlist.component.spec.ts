import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleWishlistComponent } from './toggle-wishlist.component';

describe('ToggleWishlistComponent', () => {
  let component: ToggleWishlistComponent;
  let fixture: ComponentFixture<ToggleWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleWishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
