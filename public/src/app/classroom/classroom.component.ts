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
  ExerciseID = ""
  exerciseID = "";
  
  answering = {};
  theUser = {};
  theClass = {};
  anExercise = {};
  oneStudent = {}

  theStudents = [];
  allExercises = [];
  allAnswers = [];
  allexercisersIDinclass = [];
  oneStudentExercises = []
  listOfExercisesWithAnswersForThisCurrentClassThatTheUserIsInRightNow = []
  
  exerciseBox = true;
  classMode = true;
  studentDetailMode = false;
  teacherMode = false;
  studentMode = false;
  answerform = false;
  success = false;
  banana = false;

  newanswer: any;
  exercise: any;
  theAnswer: any;

  name: String;
  message: String;
  answer: String;
  messageArray: Array<{ user: String, message: String }> = [];
  answerArray: Array<{ student: String, ans: String }> = [];

  constructor(
    private route: ActivatedRoute,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this._httpService.newMessageReceived().subscribe(data => {
      if (data['class'] == this.classID) {
        this.messageArray.push(data);
      }
    });

    this._httpService.newAnswerReceived().subscribe(data => {
      this.answerArray.push(data);
      this.banana = true;
    });
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.banana = false;

    this.messageArray = [];
    this.answerArray = [];

    this.exercise = { content: "" }
    this.theAnswer = { content: "" }

    this._route.params.subscribe((params: Params) => {
      this.UserID = params['userID']
      this.classID = params['classID']
      this._httpService.DetailUser(this.UserID).subscribe(data => {
        this.theUser = data['data'][0]
        if (this.theUser['type'] == "Teacher") {
          this.teacherMode = true;
        }
        else {
          this.studentMode = true;
        }
      })
      this._httpService.DetailClassroom(this.classID).subscribe(data => {
        this.theClass = data['data'][0]
        for (var i = 1; i < this.theClass['users'].length; i++) {
          this.theStudents.push(this.theClass['users'][i])
        }
        this.showAllExercises()
        this.showAllAnswers()
      })
    })

  }

  // METHODS

  writeExercise() {
    this.message = this.exercise.content;
    this._httpService.sendMessage({ message: this.exercise, class: this.classID })
    this.exercise = { content: "" }
  }

  open(content) {
    this.modalService.open(content);
  }

  openAnswer(answerForm, body) {
    this.answerform = true;
    this.exerciseID = body['_id']
    this.answering = body;
    this.modalService.open(answerForm);
  }

  writeAnswer() {
    this.success = true;
    this.answerform = false;
    this.newanswer = { content: this.theAnswer.content, student_name: this.theUser['name'], student_id: this.theUser['_id'] }
    this._httpService.sendAnswer({ answerObject: this.newanswer, exID: this.exerciseID });
  }

  showAllExercises() {
    for (var i = 0; i < this.theClass['exercises'].length; i++) {
      this.allExercises.push(this.theClass['exercises'][i])
      this.allexercisersIDinclass.push(this.theClass['exercises'][i]['_id'])
    }
    this.getExerciseDetail()
  }

  showAllAnswers() {
    for (var i = 0; i < this.theClass['answers'].length; i++) {
      this.allAnswers.push(this.theClass['answers'][i])
    }
  }  

  getExerciseDetail() {
    for (var i = 0; i < this.allexercisersIDinclass.length; i++) {
      this._httpService.DetailExercise(this.allexercisersIDinclass[i]).subscribe(data => {
        this.listOfExercisesWithAnswersForThisCurrentClassThatTheUserIsInRightNow.push(data['data'][0])
      })
    }
  }

  studentDetail(id: string) {
    this.oneStudentExercises = []
    this._httpService.DetailUser(id).subscribe(data => {
      this.oneStudent = data['data'][0]
      for (var i = 0; i < this.listOfExercisesWithAnswersForThisCurrentClassThatTheUserIsInRightNow.length; i++) {
        for (var j = 0; j < this.listOfExercisesWithAnswersForThisCurrentClassThatTheUserIsInRightNow[i]['answers'].length; j++) {
          if (this.listOfExercisesWithAnswersForThisCurrentClassThatTheUserIsInRightNow[i]['answers'][j]['student_id'] == id) {
            this.oneStudentExercises.push(this.listOfExercisesWithAnswersForThisCurrentClassThatTheUserIsInRightNow[i])
          }
        }
      }
      this.classMode = false;
      this.studentDetailMode = true;
    })
  }

}
