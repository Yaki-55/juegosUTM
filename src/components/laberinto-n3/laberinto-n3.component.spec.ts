import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaberintoN3Component } from './laberinto-n3.component';

describe('LaberintoN3Component', () => {
  let component: LaberintoN3Component;
  let fixture: ComponentFixture<LaberintoN3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaberintoN3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaberintoN3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
