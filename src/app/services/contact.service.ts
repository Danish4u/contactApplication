import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyContact } from '../models/myContact';
import { catchError, Observable, throwError } from 'rxjs';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string = `http://localhost:4000`;

  constructor(private http:HttpClient) { }
// //Get All Contacts Data
//   public getAllContacts():Observable<MyContact[]>{
//     let dataUrl:string = `${this.baseUrl}/contacts`;
//     return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError))
//   }
// Fetch all contacts
getAllContacts(): Observable<MyContact[]> {

  return this.http.get<MyContact[]>(`${this.baseUrl}/contacts`);
}
//get Single Contacts
  public getContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }
 //Create Contacts
 public CreateContacts(contact:MyContact):Observable<MyContact>{
  let dataUrl:string = `${this.baseUrl}/contacts`;
  return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
 }
 //Update Contacts
 public updateContacts(contact:MyContact, contactId:string):Observable<MyContact>{
  let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
  return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
 }
//Delete Contacts
public deleteContacts(contactId:string):Observable<MyContact>{
  let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
  return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError))
 }

 //get All Groups
 public getAllGroups():Observable<MyGroup[]>{
  //let dataUrl:string = `$(this.baseUrl)/groups`;
  return this.http.get<MyGroup[]>(`${this.baseUrl}/groups`);
}


//get Single Contacts
public getGroup(contact:MyContact):Observable<MyGroup>{
  let dataUrl:string = `${this.baseUrl}/groups/${contact.groupId}`;
  return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
 }


  //Error Solve
  public handleError(error:HttpErrorResponse){
    let errorMessage:string = ''
    if(error.error instanceof ErrorEvent){
      //Client side Error
      errorMessage = `Error :${error.error.message}`
    } else{
       //Server side Error
       errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage)
  }
}
