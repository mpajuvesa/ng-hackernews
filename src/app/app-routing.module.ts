import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopstoriesComponent } from './topstories/topstories.component';
import { NewestComponent } from './newest/newest.component';
import { CommentsComponent } from './comments/comments.component';
import { ShowComponent } from './show/show.component';
import { AskComponent } from './ask/ask.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: '', component: TopstoriesComponent },
  { path: 'newest', component: NewestComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'show', component: ShowComponent },
  { path: 'ask', component: AskComponent },
  { path: 'jobs', component: JobsComponent },
  { path: '**', redirectTo: 'newest', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
