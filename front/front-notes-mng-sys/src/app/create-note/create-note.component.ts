import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INote } from 'src/models/note';
import { NotesApiService } from 'src/services/notes-api.service';
import { DialogService } from '../dialog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent {
  @Output() isCreateFormDone = new EventEmitter<boolean>();
  noteForm: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    text: ['', [Validators.required, Validators.minLength(3)]],
    photo: [''],
  });
  selectedPhoto: File = null;
  constructor(
    private noteApiService: NotesApiService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService
  ) {}

  createNewNote() {
    let note_body_request: Partial<INote> = {
      title: this.noteForm.controls['title'].value,
      text: this.noteForm.controls['text'].value,
      photo: this.noteForm.controls['photo'].value,
    };

    this.noteApiService.addNote$(note_body_request).subscribe({
      next: (response) => {
        this.dialogService.successMessage('Success', 'Create Successfully');
        this.isCreateFormDone.emit(true);
        this.noteForm.reset();

        this.router.navigate(['']);
      },
      error: (err) => {
        this.dialogService.errorMessage('Error', 'Create Unsuccessfully');
      },
    });
  }

  cancelCreateNewNote() {
    this.isCreateFormDone.emit(true);
    this.noteForm.reset();
    this.router.navigate(['']);
  }
  onSelectePhoto(event) {
    if (event.target.files.length > 0) {
      this.selectedPhoto = (event.target as HTMLInputElement).files[0];
      this.noteForm.patchValue({
        photo: (event.target as HTMLInputElement).files[0],
      });
      console.log(this.noteForm.controls['photo'].value.name);
    }
  }
  onUploadPhoto() {
    let formData = new FormData();
    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);

      this.noteApiService.uploadNoteCoverPhoto(formData).subscribe({
        next: (data) => {
          if (data.success) {
            this.noteForm.patchValue({ photo: data.info.photo });
            this.selectedPhoto = null;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.dialogService.errorMessage(
            'Error',
            error.error.errors[0].message
          );
        },
      });
    }
  }
}
