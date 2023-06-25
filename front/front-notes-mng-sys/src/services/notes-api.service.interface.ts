import { INote } from 'src/models/note';
import { Observable } from 'rxjs';

export interface INotesApiService {
  getNotesList$(): Observable<INote[]>;
  getNoteDetail$(noteId: number): Observable<INote>;
  addNote$(body: Partial<INote>): Observable<any>;
  updateNote$(note_id:number, body: FormData): Observable<any>;
  deleteNote$(noteId: number): Observable<any>;
}
