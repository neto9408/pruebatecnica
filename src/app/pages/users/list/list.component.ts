import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  users$ = this.UserSvc.userlist;
    
  navigationExtras: NavigationExtras = {
    state: {
      value:null
    }
  };

  constructor(private router: Router, private UserSvc: UserService) { }

  ngOnInit(): void {

    
  }
  onGoToEdit(item: any): void {
    debugger
    if(this.navigationExtras.state!=null)
      this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(userId: any): Promise<void> {
    debugger
    try {
      debugger
      await this.UserSvc.onDeleteUser(userId);
      alert('se a eliminado un usuario');
      this.router.navigate(['list']);
    } catch (err) {
      console.log(err);
    }
  }
  
 

}
