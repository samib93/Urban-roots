import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideJardinComponent } from './guide-jardin.component';

describe('GuideJardinComponent', () => {
  let component: GuideJardinComponent;
  let fixture: ComponentFixture<GuideJardinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideJardinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuideJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
