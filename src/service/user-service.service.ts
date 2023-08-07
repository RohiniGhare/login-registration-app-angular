import { Injectable } from '@angular/core';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  usersList: User[] = [];
  listOfUsers: User[] = [];

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('registredUsers', JSON.stringify(this.usersList));
  }

  addNewUser(user: User) {
    this.usersList.push(user);
    localStorage.setItem('registredUsers', JSON.stringify(this.usersList));
  }

  getUser(): User[] {
    const users = localStorage.getItem('registredUsers');
    if (users != null) {
      this.listOfUsers = JSON.parse(users);
      return this.listOfUsers;
    } else {
      return [];
    }
  }
}
