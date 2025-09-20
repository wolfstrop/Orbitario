import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetMeshComponent } from './planet-mesh.component';

describe('PlanetMeshComponent', () => {
  let component: PlanetMeshComponent;
  let fixture: ComponentFixture<PlanetMeshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetMeshComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetMeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
