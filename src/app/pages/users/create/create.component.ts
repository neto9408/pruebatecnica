import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/users/models/user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  value: any;
  user: User;
  formusercreate!: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  
  constructor(private router: Router,private fb:FormBuilder, private userservice: UserService) {    
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras?.state?.value;
    this.initForm();
  }
  
  ngOnInit(): void {
    if (typeof this.user === 'undefined') {
      this.router.navigate(['create']);
    } else {
      this.formusercreate.patchValue(this.user);
    }
  }

  onSave(): void {
    debugger
    console.log('Saved', this.formusercreate.value);
    if (this.formusercreate.value) {
      const user = this.formusercreate.value;
      const userId = this.user?.id!;
      this.userservice.onSaveUser(user, userId);
      this.formusercreate.reset();
      this.onGoBackToList();
    }

  }
  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  private initForm():void{
    this.formusercreate = this.fb.group({
      name:['',[Validators.required]],
      fecha:['',[Validators.required]],
      email:['',[Validators.required],Validators.pattern(this.isEmail)],
      estado:['',[Validators.required]],

    })
  }

}
