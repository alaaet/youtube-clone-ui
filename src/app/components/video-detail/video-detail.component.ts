import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [VideoService]
})
export class VideoDetailComponent implements OnInit {

  videoId: string = '';
  videoUrl: string = '';
  videoTitle: string = '';
  videoAvailable: boolean = false;
  videoDescription: string = '';
  tags: Array<string> = [];

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideoById(this.videoId).subscribe((videoDto) => {
      this.videoUrl = videoDto.videoUrl;
      this.videoTitle = videoDto.title;
      this.videoDescription = videoDto.description;
      this.tags = videoDto.tags;
      this.videoAvailable = true;
    });
   }
  ngOnInit(): void {

  }
}
