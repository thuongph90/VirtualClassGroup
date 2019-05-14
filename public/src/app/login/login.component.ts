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
    console.log(this.newUser)
    if(this.newUser.name.length<2  ){
      console.log("Error validation")
      this.errorname="Name is more than 2 characters";
    }
    else if(this.newUser.email==""){
      this.erroremail="Email is required";
    }
    else if(this.newUser.password==""){
      this.errorpassword="Password is required";
    }
    else{
      console.log("YEAHHHH, Pass the validation")
      this._httpService.CreateUser(this.newUser).subscribe(data => {
        this.newUser = { name: '', email: '', password: '' }
        this._router.navigate([`/home/${data['data']._id}`])
      })
    }
  }
  errorLogin: any;
  OnLoginUser() {
    console.log("In the login")
    this._httpService.LogIn(this.LoginUser).subscribe(data => {
      console.log("result of login",data)
      if (data['message'] != "Success") {
        console.log("error",data['message'])
        this.errorLogin=data['message']
      }
      else {
        this._router.navigate([`/home/${data['data']._id}`])
      }
    })
  }

}
