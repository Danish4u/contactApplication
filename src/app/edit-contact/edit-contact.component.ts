import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  standalone: false,
  
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {
  public loading:boolean = false;
  public contactId:string | null = null;
  public contact: MyContact = {} as MyContact;
  public errorMessage:string | null = null;
  public group: MyGroup[] = [] as MyGroup[];


  constructor(private activatedRoute:ActivatedRoute, private contService:ContactService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.contService.getContacts(this.contactId).subscribe((data:MyContact)=>{
        this.contact = data;
        this.loading = false;
        this.contService.getAllGroups().subscribe((data:MyGroup[])=>{
          this.group = data;
        })
      }, (error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }
  submitUpdate(){
    if(this.contactId){
    this.contService.updateContacts(this.contact, this.contactId).subscribe((data:MyContact)=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate([`/contacts/edit/${this.contact}`]).then();
    })
  }
}
}