import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticalDialogComponent } from './artical-dialog.component';

describe('ArticalDialogComponent', () => {
  let component: ArticalDialogComponent;
  let fixture: ComponentFixture<ArticalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
