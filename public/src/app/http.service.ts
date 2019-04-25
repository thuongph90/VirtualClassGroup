import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}
  // User
  CreateUser(body){
    console.log("Go To Http-Service")
    console.log(body)
    return this._http.post("/users", body)
  }
  LogIn(body){
    console.log("Go To Http-Service")
    console.log(body)
    return this._http.post("/login", body)
  }
  DeleteUser(user){
    return this._http.delete(`users/${user._id}`)
  }
  DetailUser(id){
    return this._http.get(`/users/${id}`)
  }
  UpdateUser(body){
    return this._http.put("users/"+body['_id'], body)
  }
  //Exercise
  CreateExercise(body){
    return this._http.post("/exercises", body)
  }

  DeleteExercise(exercise){
    return this._http.delete(`exercises/${exercise._id}`)
  }
  DetailExercise(id){
    return this._http.get(`/exercises/${id}`)
  }
  UpdateExercise(body){
    return this._http.put("exercises/"+body['_id'], body)
  }
  //Answer
  CreateAnswer(body, classroom_id){
    return this._http.post(`/answers/${classroom_id}`, body)
  }

  DeleteAnswer(answer){
    return this._http.delete(`answers/${answer._id}`)
  }
  DetailAnswer(id){
    return this._http.get(`/answers/${id}`)
  }
  UpdateAnswer(body){
    return this._http.put("answers/"+body['_id'], body)
  }
  //Classroom
  CreateClassroom(body){
    console.log("Go To Http-Service")
    console.log(body)
    return this._http.post("/classroom", body)
  }

  DeleteClassroom(classroom){
    return this._http.delete(`/classrooms/${classroom._id}`)
  }
  DetailClassroom(id){
    return this._http.get(`/classroom/${id}`)
  }
 
  UpdateUserintoClassroom(body, id){
    console.log("Go To Http-Service to Add USER Into Class 998888")
    console.log(body)
    return this._http.put(`/usertoclassroom/`+id, body)
  }
  UpdateExerciseintoClassroom(body,id){
    return this._http.put(`/exercisetoclassroom/`+id, body)
  }
  UpdateAnswerintoClassroom(body,id){
    return this._http.put(`/answertoclassroom/`+id, body)
  }
  // ShowClassesofUser(body){
  //   console.log("Go To Http-Service to get all classes for user ",body)
    
  //   return this._http.get(`/classroomofuser`,body)
  // }
  // EditClassroom(body){
  //   return this._http.put("/classrooms/"+body['_id'], body)
  // }
  ShowAllClasses(){
    return this._http.get(`/classes`)
  }
}