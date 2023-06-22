import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NotesModule } from 'modules/notes/notes.module';
import { AppRoutingModule } from 'modules/app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NotesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
