import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INote } from 'src/models/note';
import { NotesApiService } from 'src/services/notes-api.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  note_id: number;
  note: INote;
  note$: Observable<INote>;
  showEditModal: boolean;
  isUpdateFormDone: any;

  constructor(
    private noteApiService: NotesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.note_id = params['note_id'];
    });
    this.getNoteDetails(); // Call the method to fetch the note's detail
  }
  getNoteDetails() {
    this.noteApiService.getNoteDetail$(Number(this.note_id)).subscribe({
      next: (res) => {
        this.note = res;
      },
      error: (err) => {
        this.dialogService.errorMessage('Error', 'Error getting note details');
      },
    });
  }
  editNoteDetail() {
    this.showEditModal = true;
  }
  deleteNote() {
    this.noteApiService.deleteNote$(this.note_id).subscribe({
      next: (res: {}) => {
        this.dialogService.successMessage('Success', 'Delete successfully');
        this.navigateToNotesListPage(); // Navigate back to the people list page
      },
      error: (err: HttpErrorResponse) => {
        this.dialogService.errorMessage('Error', 'Delete Unsuccessfully');
      },
    });
  }
  navigateToNotesListPage() {
    this.router.navigate(['']);
  }
  onSubmitUpdateForm(event: any) {
    this.isUpdateFormDone = event;
    this.showEditModal = false;
    this.getNoteDetails(); // Fetch the updated person's detail after form submission
  }
}
