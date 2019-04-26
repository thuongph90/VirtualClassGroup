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
  user = {};
  userID: any;
  classroom: any;
  newClassroom: any;
  newCode = '';
  classroomID = '';
  AllClassesofUser = [];
  Student = false;
  Teacher = false;
  AClass: any;
  // ClassByCode:any;

  public isCollapsed = true;
  public is_Collapsed = true;

  showAddCourseForm = false;

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
      console.log("************ HOMEPAGE's UserID")
      console.log(this.userID)
      this.userDetail(this.userID)


    });
    this.newClassroom = { classroom_name: "" }
    this.classroom = { classroom_name: "", classroom_code: "" }
    this.AClass = { classroom_code: "" }
  }

  userDetail(id: string): void {
    // console.log(`Click event is working`, this.userID);
    let observable = this._httpService.DetailUser(this.userID);
    observable.subscribe(retdata => {
      // console.log("Got our data!", retdata)
      this.user = retdata['data'][0];
      console.log("Got User!", this.user)
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
    console.log("Classes EEEEEEEEEEEEEE")
    this.AllClassesofUser = [];
    this._httpService.ShowAllClasses().subscribe(data => {
      console.log("All Classes is here")
      console.log(data)
      for (var i = 0; i < data['data'].length; i++) {
        for (var j = 0; j < data['data'][i]['users'].length; j++) {
          if (data['data'][i]['users'][j]['_id'] == this.userID) {
            this.AllClassesofUser.push(data['data'][i])
          }
        }
      }
      console.log("All Classes belong to user", this.AllClassesofUser)
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
    return this.newCode;
  }
  //When a Classroom is created, the whole object's user is added into users
  errorClassroomName = false;
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
      // console.log(code)
      console.log(this.newClassroom)
      this.classroom = { classroom_name: this.newClassroom.classroom_name, classroom_code: code };
      this._httpService.CreateClassroom(this.classroom).subscribe(data => {
        console.log(data);
        if(data['error']!=null){
          this.errorClassroomName = true;
        }
        else{
          this.errorClassroomName = false;
       
        this.classroomID = data['data']['_id'];
        // console.log("Classroom ID ", this.classroomID)
        // console.log("this user:", this.user)
        this.newClassroom = { classroom_name: "" }
        this.classroom = { classroom_name: "", classroom_code: "" }
        let Observable = this._httpService.UpdateUserintoClassroom(this.user, this.classroomID);
        // Observable.subscribe(data => {
        // })
        this._router.navigate([`../home/${this.userID}`])
      }
      })
    }
  }
  currentClass = { classroom_name: "" }
  classcode = ""
  getcodedone = false;
  classname = "";
  errorClassname = false;
  // error= false;
  OnGetCode() {
    console.log("To Get Code")
    let rightClassname = false
    for (var i = 0; i < this.AllClassesofUser.length; i++) {
      if (this.AllClassesofUser[i]['classroom_name'] == this.currentClass.classroom_name) {
        console.log(this.AllClassesofUser[i])
        this.classcode = this.AllClassesofUser[i]['classroom_code'];
        this.getcodedone = true;
        // this.errorClassname = false;
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

  errorEnterCode = false
  errorsameuser = false;
  OnEnterClassroombyCode() {
    console.log("Enter Classroom by code", this.AClass.classroom_code)
    this._httpService.ShowAllClasses().subscribe(data => {
      // console.log("////////////")
      // console.log("All Classes is here")
      // console.log(data)
      let samecode = false;
      let thisClassID = "";
      for (var i = 0; i < data['data'].length; i++) {

        // console.log("Classroom_code from database:", data['data'][i]['classroom_code'])
        if (data['data'][i]['classroom_code'] == this.AClass.classroom_code) {
          samecode = true;
          thisClassID = data['data'][i]['_id']
        }
      }
      if (samecode == true) {
        console.log("SameCode and ClassID is:", thisClassID)
        // console.log(this.user)
        console.log(this.AllClassesofUser)
        for (var j = 0; j < this.AllClassesofUser.length; j++) {
          // console.log(" ///////////////////For Loop through All CLasses of the user", this.AllClassesofUser)
          for (var k = 0; k < this.AllClassesofUser[j]['users'].length; k++) {
            if (this.AllClassesofUser[j]['users'][k]['_id'] == this.user['_id']) {
              this.errorsameuser = true;
              console.log("In the loop to find the user exists ")

            }
          }
        }
        if (this.errorsameuser == false) {
          let Observable = this._httpService.UpdateUserintoClassroom(this.user, thisClassID);
          Observable.subscribe(data => {
            console.log("Add Successfully", data)

          })
          this.errorEnterCode = false;
        }
        else {
          console.log("User already exists in classroom")
        }

      }
      else {
        console.log("Invalid Code")
        this.errorEnterCode = true;

      }
      // console.log("All Classes belong to user",this.AllClassesofUser)
    })

  }


  // onEdit() {
  //   let Observable = this._httpService.UpdateClassroom(this.user, this.classroomID);
  //   Observable.subscribe(data => {
  //     console.log("Edited Pet", data)
  //     console.log("////////////")
  //   })
  // }
}
