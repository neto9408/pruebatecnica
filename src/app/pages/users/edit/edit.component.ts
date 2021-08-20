import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/users/models/user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  value: any;
  user: User;
  formuser!: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  
  constructor(private router: Router,private fb:FormBuilder, private userservice: UserService) {    
    
    debugger
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras?.state?.value;
    //this.initForm();
  }
  
  ngOnInit(): void {
    debugger
    if (typeof this.user === 'undefined') {
      this.router.navigate(['create']);
    } else {
      this.formuser.patchValue(this.user);
    }
  }

  onSave(): void {
    debugger
    console.log('Saved', this.formuser.value);
    if (this.formuser.valid) {
      const employee = this.formuser.value;
      const userId = this.user?.id!;
      this.userservice.onSaveUser(employee, userId);
      this.formuser.reset();
    }

  }
  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  private initForm():void{
    this.formuser = this.fb.group({
      name:['',[Validators.required]],
      fecha:['',[Validators.required]],
      email:['',[Validators.required],Validators.pattern(this.isEmail)],
      estado:['',[Validators.required]],

    })
  }

}
