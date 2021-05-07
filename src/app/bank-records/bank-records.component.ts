import { Component, OnInit } from '@angular/core';
import { orderBy } from 'lodash';

const DEFAULT_RECORDS_COUNT_DISPLAY = 3;

const RECORDS = [
  {
    id: '1',
    accountNumber: 'IRA - 5200',
    availableCash: '$5,763.36',
    availableCashValue: 5763.36,
    changePercentage: '0.08%',
    changeValue: '$8,916.69',
    changeType: 'negative',
  },
  {
    id: '2',
    accountNumber: 'AAA - 3810',
    availableCash: '$10,050,054.07',
    availableCashValue: 10050054.07,
    changePercentage: '0.07%',
    changeValue: '$8,916.69',
    changeType: 'positive',
  },
  {
    id: '3',
    accountNumber: 'REG - 2019',
    availableCash: '$13,465,679.34',
    availableCashValue: 13465679.34,
    changePercentage: '0.00%',
    changeValue: '$0.00',
    changeType: 'zero',
  },
  {
    id: '4',
    accountNumber: 'AAA - 1812',
    availableCash: '$2,010,926.10',
    availableCashValue: 2010926.10,
    changePercentage: '0.21%',
    changeValue: '$38,881.63',
    changeType: 'positive',
  },
  {
    id: '5',
    accountNumber: 'IRA - 0146',
    availableCash: '$15,884,302.39',
    availableCashValue: 15884302.39,
    changePercentage: '0.03%',
    changeValue: '$7,430.83',
    changeType: 'positive',
  },
  {
    id: '6',
    accountNumber: 'AAA - 0029',
    availableCash: '$39,160,334.42',
    availableCashValue: 39160334.42,
    changePercentage: '0.07%',
    changeValue: '$31,435.87',
    changeType: 'negative',
  },
];

@Component({
  selector: 'app-bank-records',
  templateUrl: './bank-records.component.html',
  styleUrls: ['./bank-records.component.css'],
})
export class BankRecordsComponent implements OnInit {
  public sortOptions = {
    accountSort: 'default',
    availableCashSort: 'default',
  };
  public showAllRecords = false;
  public bankRecords = RECORDS.slice(0, DEFAULT_RECORDS_COUNT_DISPLAY);
  constructor() {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  public getColor(type) {
    if (type === 'negative') {
      return 'red';
    } else if (type === 'positive') {
      return 'green';
    } else {
      return 'gray';
    }
  }

  // tslint:disable-next-line: typedef
  public sortToggle(type) {
    if (this.sortOptions[type] === 'default') {
      this.sortOptions[type] = 'asc';
    } else if (this.sortOptions[type] === 'asc') {
      this.sortOptions[type] = 'desc';
    } else if (this.sortOptions[type] === 'desc') {
      this.sortOptions[type] = 'asc';
    }
    this.bankRecords = RECORDS.map((item) => ({
      ...item,
      number: item.accountNumber.split(' - ')[1],
    }));
    this.bankRecords = orderBy(
      this.bankRecords.map((item) => ({
        ...item,
        number: item.accountNumber.split(' - ')[1],
      })),
      [type === 'accountSort' ? 'number' : 'availableCashValue'],
      [this.sortOptions[type]]
    );
    if (!this.showAllRecords) {
      this.bankRecords = this.bankRecords.slice(0, DEFAULT_RECORDS_COUNT_DISPLAY);
    }
  }

  // tslint:disable-next-line: typedef
  public showMore() {
    this.showAllRecords = true;
    const sortFields = [];
    const sortOrder = [];
    if (this.sortOptions.accountSort !== 'default') {
      sortFields.push('number');
      sortOrder.push(this.sortOptions.accountSort);
    }
    if (this.sortOptions.availableCashSort !== 'default') {
      sortFields.push('availableCashValue');
      sortOrder.push(this.sortOptions.availableCashSort);
    }
    if (sortFields.length) {
      this.bankRecords = orderBy(
        RECORDS.map((item) => ({
          ...item,
          number: item.accountNumber.split(' - ')[1],
        })),
        sortFields,
        sortOrder
      );
    } else {
      this.bankRecords = [...RECORDS];
    }
  }
}
