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
  allExercises = [];
  allAnswers = [];
  teacherMode = false;
  studentMode = false;
  newanswer: any;
  anExercise = {};

  name: String;
  message: String;
  answer: String;
  messageArray: Array<{ user: String, message: String }> = [];
  answerArray: Array<{ student: String, ans: String }> = [];
  exercise: any;
  theAnswer: any;

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
    this._httpService.newAnswerReceived().subscribe(data => {
      this.answerArray.push(data);
    });
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

    this.exercise = { content: "" }
    this.theAnswer = { content: "" }
    this.newanswer = { content: "", student_name: "", exercise_content: "" }

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
    console.log(this.theClass, this.theUser)

  }

  // Creating exercise to push to classroom array and displaying live with sockets
  writeExercise() {
    this.message = this.exercise.content;
    this._httpService.sendMessage({ message: this.message });
    this._httpService.CreateExercise(this.exercise).subscribe(data => {
      this._httpService.UpdateExerciseintoClassroom(data['data'], this.classID).subscribe(data2 => {
      })
    })
    this.exercise = { content: "" }
  }

  writeAnswer() {
    console.log('in answer method')
    this.exercise = "Write your name";
    // Socket
    this._httpService.sendAnswer({ student: this.theUser, ans: this.theAnswer['content'], ques: this.exercise });
    var an: any;
    console.log("student name", this.theUser['name'])
    // Save to database
    this.newanswer = { content: this.theAnswer.content, student_name: this.theUser['name'], exercise_content: this.exercise }
    this._httpService.CreateAnswer(this.newanswer).subscribe(data => {
      console.log("Successfully Create An Answer", data['data'])
      an = data['data']
      this._httpService.UpdateExerciseintoClassroom(an, this.classID).subscribe(data => {
        console.log("Add Anwer into Classroom")
      })
      this.theAnswer = { content: "" }
    });
  }

  showAllExercises() {
    console.log("Classes EEEEEEEEEEEEEE")
    console.log(this.theClass['exercises'])
    for (var i = 0; i < this.theClass['exercises'].length; i++) {
      this.allExercises.push(this.theClass['exercises'][i])
    }
    console.log('All exercises', this.allExercises)
  }

  showAllAnswers() {
    console.log("Answers EEEEEEEEEEEEEE")
    for (var i = 0; i < this.theClass['answers'].length; i++) {
      this.allAnswers.push(this.theClass['answers'][i])
    }
    console.log('All answers 9999999', this.allAnswers)
  }


  // Modal //
  open(content) {
    this.modalService.open(content);
  }

}
