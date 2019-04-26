import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  name: String;
  message: String;
  messageArray: Array<{user: String, message: String}> = [];

  clientMessage: any;
  
  constructor(
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this._httpService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
    });
  }

  ngOnInit() {

    this.clientMessage = {name: "", message: ""}

  }

  sendMessage() {
    this.name = this.clientMessage.name;
    this.message = this.clientMessage.message;
    this._httpService.sendMessage({user: this.name, message: this.message});
    this.clientMessage = {name: "", message: ""}
  }


}
