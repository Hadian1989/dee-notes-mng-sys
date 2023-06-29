import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesApiService } from 'src/services/notes-api.service';
import { DialogService } from '../../services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
  @Output() isCreateFormDone = new EventEmitter<boolean>();
  noteForm: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    text: ['', [Validators.minLength(3)]],
    photo: [''],
  });
  selectedPhoto: File = null;
  constructor(
    private noteApiService: NotesApiService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService
  ) {}
  ngOnInit() {
    this.noteForm.patchValue({
      photo: 'default-cover-photo.jpg',
    });
  }

  createNewNote() {
    let formData = new FormData();
    if (this.selectedPhoto) {
      formData.append('photo', this.selectedPhoto);
    }
    formData.append('title', this.noteForm.controls['title'].value);
    formData.append('text', this.noteForm.controls['text'].value);

    this.noteApiService.addNote$(formData).subscribe({
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
      this.selectedPhoto = <File>event.target.files[0];
      this.noteForm.patchValue({
        photo: (event.target as HTMLInputElement).files[0],
      });
    }
  }
}
