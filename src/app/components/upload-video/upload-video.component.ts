import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VideoService } from '../../services/video.service';
import { UploadVideoResponse } from './UploadVideoResponse';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css'],
  providers: [VideoService]
})
export class UploadVideoComponent {
  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  fileAllowed: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  constructor(private videoService: VideoService, private router: Router) {

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.fileAllowed = this.isFileAllowed(file.name);
          console.log("Is file allowed: " + this.fileAllowed);
          if (this.fileAllowed) {
            this.fileUploaded = true;
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any): void {
    console.log(event);
  }

  public fileLeave(event: any): void {
    console.log(event);
  }

  public uploadVideo() {
    if (this.fileEntry !== undefined && this.fileAllowed) {
      this.fileEntry.file((file: File) => {
        this.videoService.uploadVideo(file).subscribe((data: UploadVideoResponse) => {
          this.router.navigateByUrl('/save-video-details/' + data.videoId);
          // Reset flags
          this.fileUploaded = false;
          this.fileAllowed = false;
        });
      });
    }
  }

  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.mov', '.mp4', '.avi', '.wmv', '.flv', '.mkv', '.webm'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
        for (const ext of allowedFiles) {
            if (ext === extension[0]) {
                isFileAllowed = true;
            }
        }
    }
    return isFileAllowed;
}
}
