import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';


const routes: Routes = [
  { path: 'user', component: UserDataComponent },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
