import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from '../components/upload-video/UploadVideoResponse';
import { VideoDto } from '../model/video-dto';

@Injectable()
export class VideoService {

  constructor(private httpClient: HttpClient) {
  }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    // Create form data
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name)
    // Headers
    const headers = new HttpHeaders({
    })
    // HTTP call to upload the file
    return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/videos', formData);
  }

  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    // Create form data
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name)
    formData.append('videoId', videoId)
    // Headers
    const headers = new HttpHeaders({
    })
    // HTTP call to upload the thumbnail file
    return this.httpClient.post(`http://localhost:8080/api/videos/thumbnail`, formData, {responseType: 'text'});
  }

  getVideoById(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>(`http://localhost:8080/api/videos/${videoId}`);
  }

  updateVideoMetadata(videoId: string, videoMetadata: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>(`http://localhost:8080/api/videos`, videoMetadata);
  }
}
