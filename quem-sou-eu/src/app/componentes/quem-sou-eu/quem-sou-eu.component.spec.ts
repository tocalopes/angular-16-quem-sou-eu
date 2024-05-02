import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemSouEuComponent } from './quem-sou-eu.component';

describe('QuemSouEuComponent', () => {
  let component: QuemSouEuComponent;
  let fixture: ComponentFixture<QuemSouEuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuemSouEuComponent]
    });
    fixture = TestBed.createComponent(QuemSouEuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
