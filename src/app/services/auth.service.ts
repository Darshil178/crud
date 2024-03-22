import { Injectable } from '@angular/core';
//import {HttpClient} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  private apiUrl="https://localhost:7161/api/User";

  createUser(user:any):Observable<any>{
   return this.http.post(this.apiUrl,user,{
      responseType:'text',
    });
  }
  // https://localhost:7161/api/user?id=1
  deleteUser(id:number):Observable<any>{
    const url=`${this.apiUrl}/${id}`;
    return this.http.delete(url,{
      responseType:'text'
    })
  }
  // https://localhost:7161/api/user?id=4
  updateUser(user:any,id:number){
    const url=`${this.apiUrl}/${id}`;
    return this.http.put(url,user,{
      responseType:'text' as 'json',
    });
  }
  getUser(){
    return this.http.get(this.apiUrl);
  }
}
