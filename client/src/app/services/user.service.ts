import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signUp(data: any){
    return this.httpClient.post(this.url + "/user/signup", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  login(data: any){
    return this.httpClient.post(this.url + "/user/login", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken(){
    return this.httpClient.get(this.url + "/user/checkToken")
  }

  getUser(): Observable<any>{
    return this.httpClient.get<any>(this.url + `/user/user?email=${localStorage.getItem('user')}`)
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(this.url + "/user/get")
  }

  changePassword(data: any){
    return this.httpClient.post(this.url + "/user/changePassword", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  forgotPassword(data: any){
    return this.httpClient.post(this.url + "/user/forgotPassword", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  changeStatus(data: any) {
    return this.httpClient.post(this.url + "/user/update", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
