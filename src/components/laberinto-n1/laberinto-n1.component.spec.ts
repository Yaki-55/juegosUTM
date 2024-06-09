import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaberintoN1Component } from './laberinto-n1.component';

describe('LaberintoN1Component', () => {
  let component: LaberintoN1Component;
  let fixture: ComponentFixture<LaberintoN1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaberintoN1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaberintoN1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
