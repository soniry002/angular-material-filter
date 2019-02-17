import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as tl from './../task.json';

export interface TableData {
  'id': number;
  'name': string;
  'description': string;
  'date': string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-filter';
  displayedColumns = ['id', 'name', 'description', 'date'];
  dataSource = new MatTableDataSource<TableData>();
  pipe: DatePipe;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public http: HttpClient) {
    this.dataSource.data = tl.default.tableData;
    this.pipe = new DatePipe('en');
    const defaultPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data, filter) => { // to sort formatted date column
      const formatted = this.pipe.transform(data.date, 'MMM dd, yyyy H:mm:ss');
      return formatted.trim().toLocaleLowerCase().indexOf(filter) >= 0 || defaultPredicate(data, filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
