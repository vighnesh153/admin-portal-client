import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/components/home/home.component';
import { ExperienceComponent } from 'src/app/components/collections/experience/experience.component';
import { ProjectsComponent } from 'src/app/components/collections/projects/projects.component';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { AuthGuard } from 'src/app/services/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'experience', component: ExperienceComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
