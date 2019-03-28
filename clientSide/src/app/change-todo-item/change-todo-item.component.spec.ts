import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTodoItemComponent } from './change-todo-item.component';

describe('ChangeTodoItemComponent', () => {
  let component: ChangeTodoItemComponent;
  let fixture: ComponentFixture<ChangeTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
