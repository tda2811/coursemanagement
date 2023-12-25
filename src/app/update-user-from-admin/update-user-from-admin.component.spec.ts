import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserFromAdminComponent } from './update-user-from-admin.component';

describe('UpdateUserFromAdminComponent', () => {
  let component: UpdateUserFromAdminComponent;
  let fixture: ComponentFixture<UpdateUserFromAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserFromAdminComponent]
    });
    fixture = TestBed.createComponent(UpdateUserFromAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
