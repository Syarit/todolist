import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './features/users/user.component';
import {ListComponent} from './features/list/component/list.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'list', component: ListComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
