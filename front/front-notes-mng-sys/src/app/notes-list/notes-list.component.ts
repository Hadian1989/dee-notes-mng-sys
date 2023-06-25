import { Component, OnInit } from '@angular/core';
import { Router, ɵafterNextNavigation } from '@angular/router';
import { INote } from 'src/models/note';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { NotesApiService } from 'src/services/notes-api.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  providers: [ConfirmationService],
})
export class NotesListComponent implements OnInit {
  notes: INote[];
  notes$: Observable<INote[]>;
  showCreateFormModal: boolean;
  isCreateFormDone: any;
  imageDirectoryPath: any = 'http://127.0.0.1:8000/storage/images/';
  isReadMore: boolean;
  constructor(
    private noteApiService: NotesApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.getNotesList();
  }
  getNotesList() {
    this.notes$ = this.noteApiService.getNotesList$();
    this.noteApiService.getNotesList$().subscribe({
      next: (res) => {
        this.notes = res;
      },
      error: (err) => {
        this.dialogService.errorMessage('Error', 'error');
      },
    });
  }

  onSubmitCreateForm(event: any) {
    this.isCreateFormDone = event;
    this.showCreateFormModal = false;
    this.getNotesList();
  }
  /**
   * Opens the create modal dialog.
   * Sets the 'showCreateModal' variable to true to show the modal.
   */
  openCreateModal() {
    this.showCreateFormModal = true;
  }
  /**
   * Cancels the create modal dialog.
   * Sets the 'showCreateModal' variable to false to hide the modal.
   */
  cancelCreateModal() {
    this.showCreateFormModal = false;
  }
  deleteNote(noteId: number, event: Event) {
    this.noteApiService.deleteNote$(noteId).subscribe({
      next: (res) => {
        this.dialogService.successMessage('Success', 'Delete Successfully');

        this.getNotesList();
      },
      error: (err) => {
        this.dialogService.errorMessage('Error', 'Delete Unsuccessfully');
      },
    });
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.noteApiService.deleteNote$(noteId).subscribe({
          next: (res) => {
            this.dialogService.successMessage('Success', 'Delete Successfully');

            this.getNotesList();
          },
          error: (err) => {
            this.dialogService.errorMessage('Error', 'Delete Unsuccessfully');
          },
        });
      },
      reject: () => {
        this.dialogService.errorMessage('Rejected', 'You have rejected');
      },
    });
  }
  onClickViewDetail(noteId: number) {
    this.router.navigate([`/note/${noteId}`]);
  }
  /**
   * Navigates to the edit page of a note with the specified ID.
   * @param noteId The ID of the note
   */
  onClickUpdateDetail(noteId: number) {
    this.router.navigate([`/note/${noteId}`]);
  }

  getSpecificTextSize(text: string): string {
    if (text.length < 110) {
      return text;
    } else {
      return text.substring(0, 100) + ' ...';
    }
  }
}
