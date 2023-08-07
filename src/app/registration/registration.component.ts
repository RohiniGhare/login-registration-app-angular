import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/service/user-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  currentUser!: any | User;
  constructor(private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.currentUser = {
      email: ["", Validators.email, Validators.required],
      phone: ["", Validators.max(10), Validators.min(10), Validators.required],
      password: ["", Validators.max(8), Validators.min(4), Validators.required],
      address: ["", Validators.required]
    }
  }

  checkEmail(email: string): boolean {
    const pattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return pattern.test(email);
  }

  checkPassword(password: string): boolean {
    if (password.length < 4) {
      alert("Password should be at least 4 characters");
    } else if (password.length > 8) {
      alert("Password should not be more than 8 characters");
    } else {
      return true;
    }
    return false;
  }

  checkPhoneNo(phone: string): boolean {
    if (phone.length != 10) {
      alert("Incorrect Phone number");
      return true;
    }
    return false;
  }

  checkAddress(address: string): boolean {
    if (address == null) {
      alert("Address is required  !!");
      return true;
    }
    return false;
  }

  onSubmit() {
    console.log(this.currentUser);
    const crrUser = JSON.stringify(this.currentUser);

    if (this.checkEmail(this.currentUser.email)) {
      if (this.checkPassword(this.currentUser.password)) {
        if (this.checkPhoneNo(this.currentUser.phone)) {
          if (this.checkAddress(this.currentUser)) {
            // sessionStorage.setItem(crrUser, crrUser);
            this.userService.addNewUser(this.currentUser);
            this.router.navigate(['/login']);
            console.log("Registration Successful");
          }
        } else {
          alert("Incorrect Contact number !!");
        }
      } else {
        alert("Incorrect Password !!");
      }
    } else {
      alert("Incorrect email Id !!");
    }

  }

}
