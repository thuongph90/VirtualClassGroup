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
    this.newUser={name: '', email:'', password: ''}
    this.LoginUser={email:'', password:''}

  }
  SignUp() {
    this.LogIn = false;
    this.Register = true;
  }
  SignIn(){
    this.LogIn= true;
    this.Register= false;
  }
  OnCreateUser(){
    console.log("AHIHIHIHIHIHI===========")
    console.log(this.newUser)
    this._httpService.CreateUser(this.newUser).subscribe(data => { 
      console.log(data)
      console.log('here?')
      if(data['error']!=null){
        console.log(data['error'])
        this.errorname= data['error']['errors']['name']['message'];
        this.erroremail=data['error']['errors']['email']['message'];
        this.errorpassword=data['error']['errors']['password']['message']
        // this.errormessage= data['error']['errors']['name']['message']
      }
      else{
        console.log(data)
        this.newUser={name: '', email:'', password: ''}
        console.log("--------------------------------ID user")
        console.log(data['data']._id)
        this._router.navigate([`/home/${data['data']._id}`])
      }
    })
  }

  OnLoginUser(){
    console.log(this.LoginUser)
    this._httpService.LogIn(this.LoginUser).subscribe(data=>{
      if(data['error']!= null){
        console.log(data['error'])
      }
      else{
        console.log(data);
        this._router.navigate([`/home/${data['data']._id}`])
      }
    })
  }

}
