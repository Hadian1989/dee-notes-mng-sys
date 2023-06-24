import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [AppRoutingModule],
})
export class SharedModule {}
