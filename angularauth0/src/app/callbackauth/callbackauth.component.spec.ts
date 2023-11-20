import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackauthComponent } from './callbackauth.component';

describe('CallbackauthComponent', () => {
  let component: CallbackauthComponent;
  let fixture: ComponentFixture<CallbackauthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallbackauthComponent]
    });
    fixture = TestBed.createComponent(CallbackauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
