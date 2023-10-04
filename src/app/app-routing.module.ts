import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  {
    path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent
  },{
    path: 'upload-video', component: UploadVideoComponent,
  },{
    path: 'video-details/:videoId', component: VideoDetailComponent
  },
  {
    path: 'unauthorized', component: UnauthorizedPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
