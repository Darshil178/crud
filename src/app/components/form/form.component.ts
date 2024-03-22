import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {FormControl,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private authservice:AuthService) { }

  update:boolean=false;
  id:number;
  user:any[]|undefined;
  userloaded:boolean=false;
   Form =new FormGroup({
     name:new FormControl(''),
     email:new FormControl(''),
     mobile:new FormControl(''),
     gender:new FormControl(''),
   });

   storeData(){
     if(this.Form.value.name!=' '){
     this.authservice.createUser(this.Form.value).subscribe(()=>{
      console.log("Success") 
      console.log(this.Form.value)
      this.Form.reset();
      this.viewUser();
     },(error:any)=>{
      console.error("Failed",error);
     })}
   }
   viewUser(){
     this.authservice.getUser().subscribe((user:any)=>{
       this.user=user;
       this.userloaded=true;
     })
   }
deleteUser(id:number){
 this.authservice.deleteUser(id).subscribe((response:any)=>{
   console.log(response);
   this.user = this.user.filter(user => user.userId !== id);
 })
}
  
    updateUser(a:any){
      console.log(a);
      this.Form.patchValue({name:a.name,email:a.email,mobile:a.mobile,gender:a.gender});
      this.update=true;
      this.id=a.userId;
      
    }
    Update(){
      this.authservice.updateUser(this.Form.value,this.id).subscribe((response:any)=>{
        console.log(response);
       this.viewUser();
       this.Form.reset();
      });
      this.update=false;
    }
    ngOnInit(): void {
    this.viewUser();
    }
}
