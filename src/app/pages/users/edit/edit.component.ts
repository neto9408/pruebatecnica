import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  value: any;
  
  private isEmail = /\S+@\S+\.\S+/;

  formuser!: FormGroup;
  constructor(private router: Router,private fb:FormBuilder) {    
   const navigate = this.router.getCurrentNavigation();  
   this.value = navigate?.extras?.state;   

  }
  
  ngOnInit(): void {
    this.initForm();
  }

  onsave():void{
    debugger
    console.log('saved',this.formuser.value);
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
