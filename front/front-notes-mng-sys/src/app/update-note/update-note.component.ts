import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INote } from 'src/models/note';
import { NotesApiService } from 'src/services/notes-api.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css'],
})
export class UpdateNoteComponent implements OnInit {
  @Output() isEditingFormFinished = new EventEmitter<boolean>();
  @Input() note: INote;
  noteForm: FormGroup = this.fb.group({
    id: [''],
    title: ['', [Validators.minLength(3), Validators.maxLength(20)]],
    text: ['', [Validators.minLength(3)]],
    photo: [''],
    created_at: [''],
  });
  id_quary: number;
  showEditModal: boolean;
  isUpdateFormDone: any;
  constructor(
    private noteApiService: NotesApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.noteForm.setValue({
      id: this.note['id'],
      title: this.note['title'],
      text: this.note['text'],
      photo: this.note['photo'],
      created_at: this.note['created_at'],
    });
  }
  updateNoteDetail() {
    let updated_note = {};
    Object.keys(this.noteForm.controls).forEach((control) => {
      if (this.noteForm.get(control).value) {
        updated_note[control] = this.noteForm.get(control).value;
      }
    });
    updated_note['id'] = this.noteForm.get('id').value;

    this.noteApiService.updateNote$(updated_note).subscribe({
      next: (res) => {
        this.dialogService.successMessage('Success', 'Update Successfully');

        this.isEditingFormFinished.emit(true);
        this.noteForm.reset();
        this.router.navigate([`/notes/${this.noteForm.controls['id'].value}`]);
      },
      error: (err) => {
        this.dialogService.errorMessage('Error', 'Update Unsuccessfully');
      },
    });
  }
  getNoteDetails() {
    this.noteApiService.getNoteDetail$(this.id_quary).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err),
          this.dialogService.errorMessage('Error', 'Error getting note detail');
      },
    });
  }
  onSubmitUpdateForm(event: any) {
    this.isUpdateFormDone = event;
    this.showEditModal = false;
    this.getNoteDetails(); // Fetch the updated person's detail after form submission
  }
  cancelNoteDetail() {
    this.isEditingFormFinished.emit(true);
    this.noteForm.reset();
    this.router.navigate([`/notes/${this.noteForm.controls['id'].value}`]);
  }
  onUploadPhoto() {}
  onDeleteLogo() {}
  onSelecteLogo(body: any) {}
  edit(body: string) {}
  selectedLogo: boolean;
  onReject() {}
}
