import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from 'models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  baseUrl = '/api/notes';
  constructor(private http: HttpClient) {}

  getNotesList$(): Observable<INote[]> {
    return this.http.get<INote[]>(this.baseUrl);
  }

  getNoteDetail$(noteId: number): Observable<INote> {
    return this.http.get<INote>(this.baseUrl.concat(`/${noteId}`));
  }

  addNote$(body: Partial<INote>): Observable<any> {
    return this.http.post(this.baseUrl, body);
  }

  updateNote$(body: {}): Observable<any> {
    let noteId: number = 0;
    return this.http.patch(this.baseUrl.concat(`/${noteId}`), body);
  }
  /**
   * Deletes a note.
   * @param noteId The ID of the note to be deleted.
   * @returns An observable that completes when the note is deleted successfully.
   */

  deleteNote$(noteId: number): Observable<any> {
    return this.http.delete(this.baseUrl.concat(`/${noteId}`));
  }
}
