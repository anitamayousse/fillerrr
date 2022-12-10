import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog'
import {DirectivesComponent} from "./directives/directives.directive"



@NgModule({
  declarations: [
    DirectivesComponent,



  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: []
})
export class FileManagerModule { }
