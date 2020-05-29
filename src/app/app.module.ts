import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ExperienceComponent } from './components/collections/experience/experience.component';
import { ProjectsComponent } from './components/collections/projects/projects.component';
import { DisplayComponent } from './components/collections/display/display.component';

import { StyledButtonComponent } from './shared/styled-button/styled-button.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ExperienceFormComponent } from './components/collections/experience/experience-form/experience-form.component';

import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExperienceComponent,
    ProjectsComponent,
    DisplayComponent,
    StyledButtonComponent,
    ModalComponent,
    ToastComponent,
    ExperienceFormComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
