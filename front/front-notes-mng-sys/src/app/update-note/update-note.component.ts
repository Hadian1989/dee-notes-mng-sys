import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INote } from 'src/models/note';
import { NotesApiService } from 'src/services/notes-api.service';
import { DialogService } from '../../services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  });
  id_quary: number;
  showEditModal: boolean;
  isUpdateFormDone: any;
  selectedPhoto: File = null;
  imageDirectoryPath: any = 'http://127.0.0.1:8000/storage/images/';

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
    });
  }
  updateNoteDetail() {
    if (this.selectedPhoto) {
      let formData = new FormData();
      formData.append('photo', this.selectedPhoto);
    }
    let updated_note = {};
    Object.keys(this.noteForm.controls).forEach((control) => {
      if (this.noteForm.get(control).value) {
        updated_note[control] = this.noteForm.get(control).value;
      }
    });
    let note_id = this.noteForm.get('id').value;

    this.noteApiService.updateNote$(note_id, updated_note).subscribe({
      next: (res) => {
        this.dialogService.successMessage('Success', 'Update Successfully');

        this.isEditingFormFinished.emit(true);
        this.noteForm.reset();
        this.router.navigate([`/notes/${this.noteForm.controls['id'].value}`]);
      },
      error: (err: HttpErrorResponse) => {
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
    this.getNoteDetails(); // Fetch the updated note's detail after form submission
  }
  cancelNoteDetail() {
    this.isEditingFormFinished.emit(true);
    this.noteForm.reset();
    this.router.navigate([`/notes/${this.id_quary}`]);
  }

  onDeleteLogo() {}
  onSelectePhoto(event) {
    if (event.target.files.length > 0) {
      this.selectedPhoto = <File>event.target.files[0];
      this.noteForm.patchValue({
        photo: (event.target as HTMLInputElement).files[0],
      });
    }
  }
  edit(body: string) {}
  onReject() {
    this.isEditingFormFinished.emit(true);
  }
}
