import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { UserServiceService } from 'src/service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin!: User;
  currentUser!: User;

  constructor(private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userLogin = {
      email: "",
      password: "",
      phone: "",
      address: ""
    }

  }

  onSubmit() {
    this.checkUser();
  }

  checkUser() {
    const listOfUsers = this.userService.getUser();

    const isUserExist = listOfUsers.find(m => m.email == this.userLogin.email && m.password == this.userLogin.password);
    if (isUserExist != undefined) {
      alert("Login Successful !!");
      this.router.navigate(['dashboard']);
    } else {
      alert("Login Failed !!");
    }
  }

}
