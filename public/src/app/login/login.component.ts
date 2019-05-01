import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LogIn = true;
  Register = false;

  newUser: any;
  LoginUser: any;
  errorname: any;
  erroremail: any;
  errorpassword: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {

    this.newUser = { name: '', email: '', password: '' }
    this.LoginUser = { email: '', password: '' }

  }

  // METHODS

  SignUp() {
    this.LogIn = false;
    this.Register = true;
  }

  SignIn() {
    this.LogIn = true;
    this.Register = false;
  }

  OnCreateUser() {
    this._httpService.CreateUser(this.newUser).subscribe(data => {
      if (data['error'] != null) {
        this.errorname = data['error']['errors']['name']['message'];
        this.erroremail = data['error']['errors']['email']['message'];
        this.errorpassword = data['error']['errors']['password']['message']
      }
      else {
        this.newUser = { name: '', email: '', password: '' }
        this._router.navigate([`/home/${data['data']._id}`])
      }
    })
  }

  OnLoginUser() {
    this._httpService.LogIn(this.LoginUser).subscribe(data => {
      if (data['error'] != null) {
      }
      else {
        this._router.navigate([`/home/${data['data']._id}`])
      }
    })
  }

}
