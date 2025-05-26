import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdListTypeComponent } from './prod-list-type.component';

describe('ProdListTypeComponent', () => {
  let component: ProdListTypeComponent;
  let fixture: ComponentFixture<ProdListTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdListTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
