import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient, private socket: Socket) { }

  // USER

  CreateUser(body) {
    return this._http.post("/users", body)
  }

  LogIn(body) {
    return this._http.post("/login", body)
  }

  DeleteUser(user) {
    return this._http.delete(`users/${user._id}`)
  }

  DetailUser(id) {
    return this._http.get(`/users/${id}`)
  }

  UpdateUser(id, body) {
    return this._http.put("users/" + id, body)
  }

  //EXERCISE

  CreateExercise(body) {
    return this._http.post("/exercises", body)
  }

  DeleteExercise(exercise) {
    return this._http.delete(`exercises/${exercise._id}`)
  }

  DetailExercise(id) {
    return this._http.get(`/exercises/${id}`)
  }

  UpdateExercise(body) {
    return this._http.put("exercises/" + body['_id'], body)
  }

  UpdateAnswerintoExercise(body, id) {
    return this._http.put(`/answertoexercise/` + id, body)
  }

  //ANSWER

  CreateAnswer(body) {
    return this._http.post(`/answers`, body)
  }

  DeleteAnswer(answer) {
    return this._http.delete(`answers/${answer._id}`)
  }
  DetailAnswer(id) {
    return this._http.get(`/answers/${id}`)
  }
  UpdateAnswer(body) {
    return this._http.put("answers/" + body['_id'], body)
  }

  //CLASSROOM

  CreateClassroom(body) {
    return this._http.post("/classroom", body)
  }

  DeleteClassroom(classroom) {
    return this._http.delete(`/classroom/${classroom._id}`)
  }

  DetailClassroom(id) {
    return this._http.get(`/classroom/${id}`)
  }

  editClassrooom(id, body) {
    return this._http.put(`/classroom/` + id, body)
  }

  getClass(id) {
    return this._http.get(`/classroom/${id}`)
  }

  UpdateUserintoClassroom(body, id) {
    return this._http.put(`/usertoclassroom/` + id, body)
  }

  UpdateExerciseintoClassroom(body, id) {
    return this._http.put(`/exercisetoclassroom/` + id, body)
  }

  ShowAllClasses() {
    return this._http.get(`/classes`)
  }

  // SOCKETS

  sendMessage(data: any) {
    this.socket.emit("message", data)
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  sendAnswer(data: any) {
    this.socket.emit("answer", data)
  }

  newAnswerReceived() {
    const observable = new Observable<{ student: String, ans: String, ques: String }>(observer => {
      this.socket.on('new answer', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}