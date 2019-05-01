import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  aClass: any;
  classroom: any;
  newClassroom: any;

  user = {};
  currentClass = { classroom_name: "" }

  AllClassesofUser = [];

  userID = "";
  newCode = "";
  classroomID = "";
  classcode = ""
  classname = "";

  Student = false;
  Teacher = false;
  errorClassroomName = false;
  getcodedone = false;
  errorClassname = false;
  errorEnterCode = false
  errorsameuser = false;
  showAddCourseForm = false;

  public isCollapsed = true;
  public is_Collapsed = true;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {

    $(document).ready(function () {
      // Canary toggle sidebar
      $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    });

    this._route.params.subscribe((params: Params) => {
      this.userID = params['id']
      this.userDetail(this.userID)
    });

    this.newClassroom = { classroom_name: "" }
    this.classroom = { classroom_name: "", classroom_code: "" }
    this.aClass = { classroom_code: "" }

  }

  // METHODS

  userDetail(id: string): void {
    let observable = this._httpService.DetailUser(this.userID);
    observable.subscribe(retdata => {
      this.user = retdata['data'][0];
      this.showAllClassesofUser()
      if (this.user['type'] == "Teacher") {
        this.Teacher = true;
      }
      else {
        this.Student = true;
      }
    });
  }

  showAllClassesofUser() {
    this.AllClassesofUser = [];
    this._httpService.ShowAllClasses().subscribe(data => {
      for (var i = 0; i < data['data'].length; i++) {
        for (var j = 0; j < data['data'][i]['users'].length; j++) {
          if (data['data'][i]['users'][j]['_id'] == this.userID) {
            this.AllClassesofUser.push(data['data'][i])
          }
        }
      }
    })
  }

  onNewCourse() {
    this.showAddCourseForm = true;
  }

  randomCodeGenerater() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      this.newCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return this.newCode
  }

  onSumbitClassroom() {
    var existnameinclass = false;
    for (var i = 0; i < this.AllClassesofUser.length; i++) {
      if (this.AllClassesofUser[i]['classroom_name'] == this.newClassroom.classroom_name) {
        existnameinclass = true;
      }
    }
    if (existnameinclass == true) {
      this.errorClassroomName = true;
    }
    else {
      this.errorClassroomName = false;
      let code = this.randomCodeGenerater();
      this.classroom = { classroom_name: this.newClassroom.classroom_name, classroom_code: code };
      this._httpService.CreateClassroom(this.classroom).subscribe(data => {
        if (data['error'] != null) {
          this.errorClassroomName = true;
        }
        else {
          this.errorClassroomName = false;
          this.classroomID = data['data']['_id'];
          this.newClassroom = { classroom_name: "" }
          this.classroom = { classroom_name: "", classroom_code: "" }
          let Observable = this._httpService.UpdateUserintoClassroom(this.user, this.classroomID);
          Observable.subscribe(data => {
          })
          this._router.navigate([`/classroom/${this.classroomID}/${this.userID}`])
        }
      })
    }
  }

  OnGetCode() {
    let rightClassname = false
    for (var i = 0; i < this.AllClassesofUser.length; i++) {
      if (this.AllClassesofUser[i]['classroom_name'] == this.currentClass.classroom_name) {
        this.classcode = this.AllClassesofUser[i]['classroom_code'];
        this.getcodedone = true;
        rightClassname = true;
        this.classname = this.currentClass.classroom_name
      }
    }
    if (rightClassname != true) {
      this.errorClassname = true
    }
    else {
      this.showAllClassesofUser()
      this.errorClassname = false
    }
  }

  OnEnterClassroombyCode() {
    this._httpService.ShowAllClasses().subscribe(data => {
      let samecode = false;
      let thisClassID = "";
      var usersintheclass = [];
      for (var i = 0; i < data['data'].length; i++) {
        if (data['data'][i]['classroom_code'] == this.aClass.classroom_code) {
          samecode = true;
          usersintheclass = data['data'][i]['users'];
          thisClassID = data['data'][i]['_id']
        }
      }
      if (samecode == true) {
        for (var k = 0; k < usersintheclass.length; k++) {
          if (usersintheclass[k]['_id'] == this.user['_id']) {
            this.errorsameuser = true;

          }
        }
        if (this.errorsameuser == false) {
          let Observable = this._httpService.UpdateUserintoClassroom(this.user, thisClassID);
          Observable.subscribe(data => {
            this._router.navigate([`/classroom/${thisClassID}/${this.userID}`])
          })
          this.errorEnterCode = false;
        }
        else {
          this._router.navigate([`/classroom/${thisClassID}/${this.userID}`])
        }

      }
      else {
        this.errorEnterCode = true
      }
    })
  }

}
