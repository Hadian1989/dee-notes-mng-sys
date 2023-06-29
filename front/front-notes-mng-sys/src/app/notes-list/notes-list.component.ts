import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from 'src/models/note';
import { ConfirmationService } from 'primeng/api';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
} from 'rxjs';
import { NotesApiService } from 'src/services/notes-api.service';
import { DialogService } from '../../services/dialog.service';

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
  @ViewChild('title', { static: true }) title: ElementRef;
  searchKeyword: string;
  constructor(
    private noteApiService: NotesApiService,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.filteredNotes$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((keyword) => this.filterItems(keyword))
    );
  }
  //  concatMap((item) => this.noteApiService.getFilterNoteTitle(item))

  ngOnInit(): void {
    this.getNotesList();
  }
  changeFilterKeyword() {}
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
  }
  /**
   * Navigates to the edit page of a note with the specified ID.
   * @param noteId The ID of the note
   */
  onClickViewAndUpdateDetail(noteId: number) {
    this.router.navigate([`/note/${noteId}`]);
  }

  getSpecificTextSize(text: string | null): string {
    if (text?.length < 100) {
      return text;
    } else {
      return text.substring(0, 100) + ' ...';
    }
  }
  private searchSubject = new BehaviorSubject<string>('');
  filteredNotes$: Observable<INote[]>;

  search() {
    this.searchSubject.next(this.searchKeyword);
  }

  filterItems(keyword: string): INote[] {
    if (!keyword) {
      return this.notes;
    }
    keyword = keyword.toLowerCase();
    return this.notes.filter((item) =>
      item.title?.toLowerCase().includes(keyword)
    );
  }
}
