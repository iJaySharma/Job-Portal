import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeprofileComponent } from './seeprofile.component';

describe('SeeprofileComponent', () => {
  let component: SeeprofileComponent;
  let fixture: ComponentFixture<SeeprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeprofileComponent]
    });
    fixture = TestBed.createComponent(SeeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
