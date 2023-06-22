import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INote } from 'src/models/note';
import { MessageService } from 'primeng/api';
import { NotesApiService } from 'src/services/notes-api.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent {
  @Output() isCreateFormDone = new EventEmitter<boolean>();
  noteForm: FormGroup = this.fb.group({
    id: [''],
    title: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(20)],
    ],
    text: ['', [Validators.required, Validators.minLength(3)]],
    image: [''],
  });
  constructor(
    private noteApiService: NotesApiService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}
  createNewNote() {
    let note_body_request: Partial<INote> = {
      title: this.noteForm.controls['title'].value,
      text: this.noteForm.controls['text'].value,
      image: this.noteForm.controls['image'].value,
    };

    this.noteApiService.addNote$(note_body_request).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Create Successfully',
        });
        this.isCreateFormDone.emit(true);
        this.noteForm.reset();

        this.router.navigate(['']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Create Unsuccessfully',
        });
      },
    });
  }

  cancelCreateNewNote() {
    this.isCreateFormDone.emit(true);
    this.noteForm.reset();
    this.router.navigate(['']);
  }
}
