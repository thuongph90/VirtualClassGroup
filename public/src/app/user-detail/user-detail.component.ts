import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  newCode= "";
  classroomID="";
  
  user = {};
  
  AllClassesofUser=[];
  
  userID: any;
  classroom: any;
  newClassroom: any;
  updateClassroom: any;
  
  editUser: any;
  
  Student= false; 
  Teacher= false;
  showEditForm = false;
  showPersonalEditForm = false;
  showAddCourseForm = false;

  public isCollapsed = true;
  public is_Collapsed = true;

  constructor(
    private modalService: NgbModal,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  // Edit Classroom Modal

  closeResult: string;

  open(moreContent, body) {
    this.onEditButton(body)
    this.modalService.open(moreContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  //

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

    this.newClassroom={classroom_name:""}
    this.classroom={classroom_name: "", classroom_code: ""}
    this.editUser={name: '', email:''}
    this.updateClassroom = {};

  }

  // METHODS

  userDetail(id: string): void {
    let observable = this._httpService.DetailUser(this.userID);
    observable.subscribe(retdata => {
      this.user = retdata['data'][0];
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
    this._httpService.ShowAllClasses().subscribe(data=>{
      for( var i=0; i<data['data'].length; i++){
        for(var j=0; j<data['data'][i]['users'].length; j++){
          if(data['data'][i]['users'][j]['_id']== this.userID){
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
    return this.newCode;
  }

  onSumbitClassroom() {
    let code = this.randomCodeGenerater();
    this.classroom = {classroom_name: this.newClassroom.classroom_name, classroom_code: code};
    this._httpService.CreateClassroom(this.classroom).subscribe(data => {
      this.classroomID= data['data']['_id'];
      this.newClassroom={classroom_name:""}
      this.classroom={classroom_name: "", classroom_code: ""}
      let Observable = this._httpService.UpdateUserintoClassroom(this.user, this.classroomID);
    Observable.subscribe(data => {
    })
    })
  }

  OnEditUser() {
    console.log("in Component with userID:", this.userID, "Edit body", this.user)
    let Observable = this._httpService.UpdateUser(this.userID, this.user);
    Observable.subscribe(data => {
      this.showPersonalEditForm = false;
    })
  }

  deleteClass(body: {}){
    let observable = this._httpService.DeleteClassroom(body);
    observable.subscribe(data => { 
      this.AllClassesofUser = [];
      this.showAllClasses()
  })
  }

  onEditButton(body: object){
    console.log("DUMA in the edit class",body);
    this.showEditForm = true;
    this.updateClassroom= body;
  }

  onEditButtonForPersonalForm(){
    this.showPersonalEditForm = true;
  }

  // onEditClass(){
  //   let observable = this._httpService.editClassrooom(this.updateClassroom._id, this.updateClassroom);
  //   observable.subscribe(data => {
  //     this.updateClassroom = {classroom_name: ""}
  //     this.AllClassesofUser = [];
  //     this.showAllClasses()
  //   })    
  // }
  Cancel(){
    this.showPersonalEditForm = false;
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}


