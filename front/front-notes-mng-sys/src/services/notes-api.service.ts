import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from 'src/models/note';
import { INotesApiService } from './notes-api.service.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService implements INotesApiService {
  baseUrl = `${environment.apiUrl}/api`;
  constructor(private http: HttpClient) {}

  getNotesList$(): Observable<INote[]> {
    return this.http.get<INote[]>(this.baseUrl.concat(`/notes`));
  }

  getNoteDetail$(noteId: number): Observable<INote> {
    return this.http.get<INote>(this.baseUrl.concat(`/note/${noteId}`));
  }

  addNote$(body: Partial<INote>): Observable<any> {
    return this.http.post(this.baseUrl.concat(`/notes`), body);
  }

  updateNote$(body: {}): Observable<any> {
    let noteId: number = 0;
    return this.http.patch(this.baseUrl.concat(`/note/${noteId}`), body);
  }
  /**
   * Deletes a note.
   * @param noteId The ID of the note to be deleted.
   * @returns An observable that completes when the note is deleted successfully.
   */

  deleteNote$(noteId: number): Observable<any> {
    return this.http.delete(this.baseUrl.concat(`/${noteId}`));
  }
  uploadNoteCoverPhoto(photo: any): Observable<any> {
    return this.http.patch<any>(this.baseUrl.concat(`/note`), photo);
  }
  deleteNoteCoverPhoto(noteId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl.concat(`/note/${noteId}`));
  }
}
