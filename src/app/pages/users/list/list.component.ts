import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  user: any;
    
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  edit(item: any): void {
    debugger
    this.user = item;
    this.router.navigate(['edit'],this.user);
  }
  delete(item: any){
    this.user = item;
    alert(['Delete']);
  }

}
