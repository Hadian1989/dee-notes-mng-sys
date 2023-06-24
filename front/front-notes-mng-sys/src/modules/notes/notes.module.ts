import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteComponent } from 'src/app/create-note/create-note.component';
import { NoteComponent } from 'src/app/note/note.component';
import { NotesListComponent } from 'src/app/notes-list/notes-list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateNoteComponent } from 'src/app/update-note/update-note.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    CreateNoteComponent,
    NoteComponent,
    NotesListComponent,
    UpdateNoteComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ConfirmPopupModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ConfirmPopupModule,
    AppRoutingModule,
  ],
  providers: [MessageService,ConfirmationService],
})
export class NotesModule {}
