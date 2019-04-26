import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ClassroomComponent implements OnInit {
  
  UserID = "";
  classID = "";
  theUser = {};
  theClass = {};
  theStudents = [];
  teacherMode = false;
  studentMode = false;

  name: String;
  message: String;
  messageArray: Array<{ user: String, message: String }> = [];
  exercise: any;
  answer: any

  constructor(
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) {
    this._httpService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
    });
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.exercise = { message: "" }
    this.answer = { message: "" }

    this._route.params.subscribe((params: Params) => {
      this.UserID = params['userID']
      this.classID = params['classID']
      this._httpService.DetailUser(this.UserID).subscribe(data => {
        this.theUser = data['data'][0]
        if (this.theUser['type'] == "Teacher") {
          this.teacherMode = true;
        }
        else{
          this.studentMode = true;
        }
      })
      this._httpService.DetailClassroom(this.classID).subscribe(data => {
        this.theClass = data['data'][0]
        for (var i=1; i<this.theClass['users'].length; i++){
          this.theStudents.push(this.theClass['users'][i])
        }
      })
    })

    console.log(this.theClass, this.theUser)
  }

  writeExercise() {
    this.name = this.theUser['name'];
    this.message = this.exercise.message;
    this._httpService.sendMessage({ user: this.name, message: this.message });
    this.exercise = { message: "" }
  }

  // Modal //
  open(content) {
    this.modalService.open(content);
  }

}
