import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteComponent } from 'src/app/create-note/create-note.component';
import { NoteComponent } from 'src/app/note/note.component';
import { NotesListComponent } from 'src/app/notes-list/notes-list.component';

@NgModule({
  declarations: [CreateNoteComponent, NoteComponent, NotesListComponent],
  imports: [CommonModule],
})
export class NotesModule {}
