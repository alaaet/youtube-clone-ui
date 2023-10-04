import { FormControl, FormGroup } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { VideoDto } from 'src/app/model/video-dto';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css'],
  providers: [VideoService,MatSnackBar]
})
export class SaveVideoDetailsComponent {
  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  isFileSelected: boolean = false;
  selectedFile!: File;
  selectedFileName: string = '';
  videoId: string = '';
  videoUrl: string = '';
  thumbnailUrl: string = '';

  // Chips variables
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  // CONSTRUCTOR
  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideoById(this.videoId).subscribe((videoDto) => {
      this.videoUrl = videoDto.videoUrl;
    });
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus
    });
  }

  // Chips methods
  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  // Get thumbnail image details and make sure the file is an image
  onFileSelected($event: Event) {
    this.selectedFile = ($event.target as HTMLInputElement).files![0];
    this.selectedFileName = this.selectedFile.name;
    this.isFileSelected = true;
  }
  // Upload thumbnail image to server
  onThumbnailUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId).subscribe((url: string) => {
      this.thumbnailUrl = url;
      // Show an upload success message with snackbar
      this.matSnackBar.open('Thumbnail uploaded successfully', 'Close', {
        duration: 3000
      });
    });
  }
  // Save video details
  saveMetadata() {
    // Make an http call to the server to save the video details
    const videoMetadata: VideoDto = {
      id: this.videoId,
      title: this.saveVideoDetailsForm.value.title,
      description: this.saveVideoDetailsForm.value.description,
      videoStatus: this.saveVideoDetailsForm.value.videoStatus,
      tags: this.tags,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl
    };
    this.videoService.updateVideoMetadata(this.videoId, videoMetadata).subscribe((videoDto: VideoDto) => {
      console.log(videoDto);
      // Show an upload success message with snackbar
      this.matSnackBar.open('Video details saved successfully', 'Close', {
        duration: 3000
      });
    });
    console.log(this.saveVideoDetailsForm.value);
    console.log(this.tags);
  }

}
