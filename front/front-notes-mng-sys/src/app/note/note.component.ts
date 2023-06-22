import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotesApiService } from 'src/services/notes-api.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  note_id: number;

  constructor(
    private noteApiService: NotesApiService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.note_id = params['id'];
    });
    this.getNoteDetails(); // Call the method to fetch the note's detail
  }
  getNoteDetails() {
    this.noteApiService.getNoteDetail$(this.note_id).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err),
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error getting note detail',
          });
      },
    });
  }

}
