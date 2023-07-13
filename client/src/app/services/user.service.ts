import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    signUp(data: any) {
        return this.httpClient.post(this.url + '/api/user/signup', data, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
    }

    login(data: any) {
        return this.httpClient.post(this.url + '/api/user/login', data, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
    }

    checkToken() {
        return this.httpClient.get(this.url + '/api/user/checkToken');
    }

    getUser(): Observable<any> {
        return this.httpClient.get<any>(
            this.url + `/api/user/user?email=${localStorage.getItem('user')}`
        );
    }

    getAllUsers(): Observable<any> {
        return this.httpClient.get<any>(this.url + '/api/user/get');
    }

    getAllMinUsers(): Observable<any> {
        return this.httpClient.get<any>(this.url + '/api/user/getMin');
    }

    changePassword(data: any) {
        return this.httpClient.post(
            this.url + '/api/user/changePassword',
            data,
            {
                headers: new HttpHeaders().set(
                    'Content-Type',
                    'application/json'
                ),
            }
        );
    }

    forgotPassword(data: any) {
        return this.httpClient.post(
            this.url + '/api/user/forgotPassword',
            data,
            {
                headers: new HttpHeaders().set(
                    'Content-Type',
                    'application/json'
                ),
            }
        );
    }

    changeStatus(data: any) {
        return this.httpClient.post(this.url + '/api/user/update', data, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
    }

    removeUser(email: string): Observable<any> {
        return this.httpClient.delete(
            this.url + `/api/user/delete?email=${email}`
        ); // TODO: This isn't working...
    }

    getUserImage(username: string): Observable<Blob> {
        return this.httpClient.get(
            this.url + `/api/images/get?id=${username}`,
            { responseType: 'blob' }
        );
    }

    uploadUserImage(data: any): Observable<any> {
        return this.httpClient.post(
            this.url + '/api/images/upload/local',
            data,
            {
                //headers: new HttpHeaders().set('Content-Type', 'multipart/file')
            }
        );
    }
}
