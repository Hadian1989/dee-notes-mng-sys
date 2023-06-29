import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from 'src/app/note/note.component';
import { NotesListComponent } from 'src/app/notes-list/notes-list.component';

export const routes: Routes = [
  // Redirects the root URL to the 'notes' route
  { path: '', pathMatch: 'full', redirectTo: '/notes' },
  // Lazily loads the 'NotesRoutingModule' module for the 'notes' route
  { path: 'notes', component: NotesListComponent },

  { path: 'note/:note_id', component: NoteComponent }, // Route for the note detail page with a dynamic ID parameter

  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
