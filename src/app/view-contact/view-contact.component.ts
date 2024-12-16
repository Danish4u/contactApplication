import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { ContactService } from '../services/contact.service';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Component({
  selector: 'app-view-contact',
  standalone: false,
  
  templateUrl: './view-contact.component.html',
  styleUrl: './view-contact.component.css'
})
export class ViewContactComponent implements OnInit {
  public contactId:string | null = null;
  public loading:boolean = false;
  public contact:MyContact = {} as MyContact; 
  public errorMessage:string |null = null;
  public group:MyGroup = {} as MyGroup; 
  
  constructor(private activatedRoute:ActivatedRoute,

  private contService:ContactService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.loading = true;
    this.contService.getContacts(this.contactId).subscribe((data:MyContact)=>{
      this.contact = data;
      this.loading = false;
      this.contService.getGroup(data).subscribe((data:MyGroup)=>{
        this.group = data;
      })
    }, (error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
    
    }
  }
public isNotEmpty(){
  return Object.keys(this.contact).length >0 && Object.keys(this.group)
  .length >0;
}
}
