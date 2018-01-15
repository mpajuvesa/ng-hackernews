import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { CommentsComponent } from './comments/comments.component';
import { ShowComponent } from './show/show.component';
import { AskComponent } from './ask/ask.component';
import { JobsComponent } from './jobs/jobs.component';
import { NewestComponent } from './newest/newest.component';

import { ApiService } from './services/api.service';
import { StateService } from './services/state.service';
import { TopstoriesComponent } from './topstories/topstories.component';
import { PrettyUrlPipe } from './pipes/pretty-url.pipe';
import { DatePipe } from './pipes/date.pipe';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsItemComponent,
    CommentsComponent,
    ShowComponent,
    AskComponent,
    JobsComponent,
    NewestComponent,
    TopstoriesComponent,
    PrettyUrlPipe,
    DatePipe,
    LoadingBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    ApiService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
