
import { NgModule } from '@angular/core';
import {
  MatListModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatTableModule, MatIconModule, MatSlideToggleModule, MatCheckboxModule,
  MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';


@NgModule({
  imports: [
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatNativeDateModule]
})
export class MaterialModule { }
