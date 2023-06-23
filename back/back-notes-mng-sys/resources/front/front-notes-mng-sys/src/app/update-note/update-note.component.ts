import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotesApiService } from 'src/services/notes-api.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent {
  @Output() isEditingFormFinished = new EventEmitter<boolean>();
  @Input() person: FormGroup;
  noteForm: FormGroup = this.fb.group({
    id: [''],
    title: [
      '',
      [Validators.email, Validators.maxLength(20)],
    ],
    text: ['', [ Validators.minLength(3)]],
    image: [''],
  });
  constructor(
    private noteApiService: NotesApiService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}


}
