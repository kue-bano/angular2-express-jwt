/**
 * Created by Kingsley on 6/23/2017.
 */

import {Component, OnInit} from "@angular/core";
import {AuthService} from "../authentication/auth.service";
@Component ({
  selector:'login',
  templateUrl:'./login.component.html'
})

export class LoginComponent implements OnInit {
  ngOnInit():void {
    this.user = new UserModel();
  }

  constructor(private as: AuthService) {}

  user:UserModel

  onSubmit() {
    this.as.authenticate(this.user).subscribe((result) => {
    })
  }

}


export class UserModel {
  email:string;
  password:string;
}
