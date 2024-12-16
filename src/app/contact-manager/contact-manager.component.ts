import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  standalone: false,
  
  templateUrl: './contact-manager.component.html',
  styleUrl: './contact-manager.component.css'
})
export class ContactManagerComponent implements OnInit {
  public loading:boolean = true;
  public contacts:MyContact[] = [];
  public errorMessage:string | null = null;

  constructor(private cantService:ContactService) {
    

    
  }

  ngOnInit(): void { 
    this.getAllContactData()   
    //this.loading=true;
  //   this.cantService.getAllContacts().subscribe((data:MyContact[])=>{      
  //         }, (error)=>{
  //     this.errorMessage = error;
      
  //   })
  // }
  this.cantService.getAllContacts().subscribe(
    (data: MyContact[]) => {
      this.contacts = data; // Populate contacts array
      this.loading = false; // Set loading to false when data is loaded
    },
    (error) => {
      this.errorMessage = error.message; // Capture error message
      this.loading = false; // Set loading to false even in error
    }
  );
  }

  getAllContactData(){
    this.loading=true;
    this.cantService.getAllContacts().subscribe((data:MyContact[])=>{
      this.contacts = data;
      this.loading = false;

    }, (error)=>{
      this.errorMessage = error;
      this.loading = false; 
    })
  }
  deleteContact(contactId:string | undefined){
    if(contactId){
      this.cantService.deleteContacts(contactId).subscribe((data:{})=>{
        this.getAllContactData();
      },(error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }
}
