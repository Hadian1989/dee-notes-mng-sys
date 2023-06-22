import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // Redirects the root URL to the 'people' route
  { path: '', pathMatch: 'full', redirectTo: '/notes' },
  // Lazily loads the 'PeopleRoutingModule' module for the 'people' route
  {
    path: 'notes',
    loadChildren: () =>
      import('../notes-routing/notes-routing.module').then((m) => m.NotesRoutingModule),
  },
  // Redirects any unknown route to the root URL
  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
