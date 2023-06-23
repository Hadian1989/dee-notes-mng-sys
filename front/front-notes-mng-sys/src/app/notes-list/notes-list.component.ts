import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from 'src/models/note';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { NotesApiService } from 'src/services/notes-api.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  providers: [MessageService,ConfirmationService],
})
export class NotesListComponent implements OnInit {
  notes: INote[];
  notes$: Observable<INote[]>;
  constructor(
    private noteApiService: NotesApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getNotesList();
  }
  getNotesList() {
    this.notes$ = this.noteApiService.getNotesList$();
  }
}
