import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunMeshComponentComponent } from './sun-mesh-component.component';

describe('SunMeshComponentComponent', () => {
  let component: SunMeshComponentComponent;
  let fixture: ComponentFixture<SunMeshComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunMeshComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunMeshComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
