import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(
      `https://excelerate-profile-dev.s3.ap-south-1.amazonaws.com/1681980949109_users.json?q=Chetan%20Kumar`
    );
  }
}
