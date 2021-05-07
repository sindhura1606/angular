import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRecordsComponent } from './bank-records.component';

describe('BankRecordsComponent', () => {
  let component: BankRecordsComponent;
  let fixture: ComponentFixture<BankRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
