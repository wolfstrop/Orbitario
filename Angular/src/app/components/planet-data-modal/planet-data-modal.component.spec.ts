import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDataModalComponent } from './planet-data-modal.component';

describe('PlanetDataModalComponent', () => {
  let component: PlanetDataModalComponent;
  let fixture: ComponentFixture<PlanetDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetDataModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
