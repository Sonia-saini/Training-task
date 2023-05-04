import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any = [];
  currentPage: number = 1;
  limit: number = 10;
  selectedRows: any = [];
  private rowSelectionSubject = new Subject<any>();
  count = 0;
  email = '';
  name = '';
  role = '';
  id = 0;
  search: string = '';
  constructor(private data: UserdataService) {
    this.rowSelectionSubject.subscribe((selectedRows) => {
      this.selectedRows = selectedRows;
    });
  }
  Userlist() {
    this.data.getUsers().subscribe((data) => (this.users = data));
  }
  onSearch(event: any) {
    console.log(event.target.value.length);
    this.search = event.target.value;
    if (event.target.value.length !== 0) {
      this.users = this.users.filter((el: any) => {
        if (
          el.name.toLowerCase().includes(this.search.toLowerCase()) ||
          el.email.toLowerCase().includes(this.search.toLowerCase()) ||
          el.role.toLowerCase().includes(this.search.toLowerCase())
        ) {
          console.log(
            el.role.toLowerCase().includes(this.search.toLowerCase())
          );
          return el;
        }
      });
    } else {
      this.Userlist();
    }
  }

  toggleRowSelection(row: any) {
    const isSelected = this.selectedRows.includes(row);
    if (isSelected) {
      this.selectedRows = this.selectedRows.filter((r: any) => r !== row);
    } else {
      this.selectedRows = [...this.selectedRows, row];
    }
    this.rowSelectionSubject.next(this.selectedRows);
  }

  toggleAllRowsSelection() {
    const allRows = this.users.slice(
      this.currentPage - 1,
      this.currentPage * this.limit
    );
    const areAllRowsSelected = allRows.every((r: any) =>
      this.selectedRows.includes(r)
    );
    if (areAllRowsSelected) {
      this.selectedRows = this.selectedRows.filter(
        (r: any) => !allRows.includes(r)
      );
    } else {
      this.selectedRows = [...this.selectedRows, ...allRows];
    }
    this.rowSelectionSubject.next(this.selectedRows);
  }
  deletebutton(x: any) {
    this.users = this.users.filter((el: any) => el.id !== x.id);
    alert('Item is successfully deleted');
  }
  deleteSelectedRows() {
    const displayedRows = this.users.slice(
      this.currentPage - 1,
      this.currentPage * this.limit
    );
    console.log(displayedRows, this.selectedRows);
    this.users = this.users.filter(
      (el: any) => !this.selectedRows.includes(el)
    );
    this.selectedRows = this.selectedRows.filter(
      (el: any) => !displayedRows.includes(el)
    );
    alert('Select Item is successfully deleted');
  }

  ngOnInit() {
    this.data.getUsers().subscribe((data) => (this.users = data));
    this.Userlist();
  }
  onTablepage(event: any) {
    this.currentPage = Math.ceil(event);
    this.users;
  }
  displayStyle = 'none';

  openPopup(id: any) {
    this.id = id;
    console.log(this.id);
    this.displayStyle = 'block';
  }
  onemail(event: any) {
    this.email = event.target.value;
  }
  onname(event: any) {
    this.name = event.target.value;
  }
  onrole(event: any) {
    this.role = event.target.value;
  }
  edit() {
    let update = { email: this.email, name: this.name, role: this.role };
    this.users = this.users.map((el: any) => {
      if (el.id === this.id) {
        return {
          ...el,
          ...update,
        };
      }
      return el;
    });

    this.displayStyle = 'none';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
