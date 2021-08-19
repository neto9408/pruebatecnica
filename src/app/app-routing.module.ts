import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'list', loadChildren: () => import('./pages/users/list/list.module').then(m => m.ListModule) },
  { path: 'create', loadChildren: () => import('./pages/users/create/create.module').then(m => m.CreateModule) },
  { path: 'edit', loadChildren: () => import('./pages/users/edit/edit.module').then(m => m.EditModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }