import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user = {};
  userID: any;
  classroom: any;
  newClassroom: any;
  newCode= '';
  classroomID='';
  AllClassesofUser=[];
  Student= false; 
  Teacher= false;
  showEditForm = false;
  updateClassroom: any;
  OneSingleClassroom: any;
  showPersonalEditForm = false;

  editUser: any;

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
    this.newClassroom={classroom_name:""}
    this.classroom={classroom_name: "", classroom_code: ""}
    this.editUser={name: '', email:''}
    this.updateClassroom = {classroom_name: ""}
  }

  userDetail(id: string): void {
    // console.log(`Click event is working`, this.userID);
    let observable = this._httpService.DetailUser(this.userID);
    observable.subscribe(retdata => {
      // console.log("Got our data!", retdata)
      this.user = retdata['data'][0];
      console.log("Got User!", this.user)
      this.showAllClasses()
      if(this.user['type']=="Teacher"){
        this.Teacher= true;
      }
      else{
        this.Student=true;
      }
    });
  }

  showAllClasses(){
    console.log("Classes EEEEEEEEEEEEEE")

    this._httpService.ShowAllClasses().subscribe(data=>{
      console.log("All Classes is here")
      console.log(data)
      for( var i=0; i<data['data'].length; i++){
        for(var j=0; j<data['data'][i]['users'].length; j++){
          if(data['data'][i]['users'][j]['_id']== this.userID){
            this.AllClassesofUser.push(data['data'][i])
          }
        }
      }
      console.log("All Classes belong to user",this.AllClassesofUser)
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
//When a Classroom is created, the user is added into the 
  onSumbitClassroom() {
    let code = this.randomCodeGenerater();
    // console.log(code)
    console.log(this.newClassroom)
    this.classroom = {classroom_name: this.newClassroom.classroom_name, classroom_code: code};
    this._httpService.CreateClassroom(this.classroom).subscribe(data => {
      console.log(data);
      this.classroomID= data['data']['_id'];
      console.log("=====8888=====Classroom ID ")
      console.log(this.classroomID)
      
      console.log("this user:")
      console.log(this.user)
      this.newClassroom={classroom_name:""}
      this.classroom={classroom_name: "", classroom_code: ""}
      // this._httpService.UpdateClassroom(this.user, this.classroomID)
      // this.onEdit();
      let Observable = this._httpService.UpdateUserintoClassroom(this.user, this.classroomID);
    Observable.subscribe(data => {
      console.log("Edited Pet", data)
      console.log("////////////")
    })
    })
  }

  OnEditUser() {
    console.log("hittttt edit function in edit component")
    console.log(this.editUser)
    let Observable = this._httpService.UpdateUser(this.userID, this.editUser);
    Observable.subscribe(data => {
      this.editUser={name: '', email:''}
    })
  }

  deleteClass(body: {}){
    console.log(body)
    let observable = this._httpService.DeleteClassroom(body);
    observable.subscribe(data => { 
      this.AllClassesofUser = [];
      this.showAllClasses()
  })
  }

  onEditButton(id: string){
    let observable = this._httpService.getClass(id);
    observable.subscribe(data => {
      console.log();
     
      this.OneSingleClassroom =data['data'];
      console.log(this.OneSingleClassroom[0]._id);
     
      this.showEditForm = true;
    });
  }

  onEditButtonForPersonalForm(){
    this.showPersonalEditForm = true;
  }

  onEditClass(){
    console.log("hittt component");
    let observable = this._httpService.editClassrooom(this.OneSingleClassroom[0]._id, this.updateClassroom);
    observable.subscribe(data => {
      console.log(data);
      this.updateClassroom = {classroom_name: ""}
      // this._router.navigate(['/userDetail/'+this.userID]);
      this.AllClassesofUser = [];
      this.showAllClasses()

    })
    // this.showAllClasses()
    
    
  }
}


