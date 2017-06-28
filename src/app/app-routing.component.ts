import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
/**
 * Created by Kingsley on 6/23/2017.
 */

const routes:Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules,useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
