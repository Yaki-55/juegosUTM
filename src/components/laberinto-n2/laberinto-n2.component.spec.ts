import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaberintoN2Component } from './laberinto-n2.component';

describe('LaberintoN2Component', () => {
  let component: LaberintoN2Component;
  let fixture: ComponentFixture<LaberintoN2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaberintoN2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaberintoN2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
