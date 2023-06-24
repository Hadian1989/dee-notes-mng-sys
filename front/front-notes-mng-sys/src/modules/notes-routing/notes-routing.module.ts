import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from 'src/app/notes-list/notes-list.component';
import { NoteComponent } from 'src/app/note/note.component';

export const note_routes: Routes = [
  {
    path: '',
    component: NotesListComponent,
    children: [
      { path: '/:id', component: NoteComponent }, // Route for the note detail page with a dynamic ID parameter
    ],
  }, // Default route for the notes list page
  // { path: 'noter', component: NoteComponent }, // Route for the note detail page with a dynamic ID parameter
];

@NgModule({
  imports: [RouterModule.forChild(note_routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
