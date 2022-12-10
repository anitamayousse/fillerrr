import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';


/**
 * @title Data table with sorting, pagination, and filtering.
 */

export interface PeriodicElement {
  name: string;
  uploadDate: Date;
  size: number;
  status: number;
  favorite: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Illustration-Algo.ai', uploadDate: new Date("February 4, 2016 10:13:00"), size: 124.4, status: 1, favorite: true },
  { name: 'Header_hero-Algo.ai', uploadDate: new Date("February 4, 2016 10:13:00"), size: 320, status: 1, favorite: true },
  { name: 'Rework-shoot-Algo.psd', uploadDate: new Date("February 4, 2016 10:13:00"), size: 534, status: 2, favorite: false },
  { name: 'Pres-webinar-Pillar1.id', uploadDate: new Date("February 4, 2016 10:13:00"), size: 1.3, status: 2, favorite: false },
  { name: 'Video-pres-Algo_4K.pr', uploadDate: new Date("February 4, 2016 10:13:00"), size: 12.9, status: 3, favorite: true },
  { name: 'Test-proto-UI-Mobile.xd', uploadDate: new Date("February 4, 2016 10:13:00"), size: 30.4, status: 3, favorite: false },

];


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.sass']
})
export class FileManagerComponent {



  /**
 * @title Table with filtering
 */

  displayedColumns: string[] = ['name', 'uploadDate', 'size', 'status', 'favorite'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter() {

    // const filterDate = (e.target as HTMLInputElement).(e:new Date=> e.date >= this.form.value.fromDate && e.date <= this.form.value.toDate);
    // this.dataSource.filter = filterDate.filter()
  }


  constructor(public dialog: MatDialog) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddDialogComponent, {
      width: '21rem',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

}


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
      })),
      state('closed', style({
        display: "none"
      })),
      transition('open => *', [
        animate('2s', keyframes([
          style({
            opacity: 0.1, offset: 0.1, borderRightColor: "#1ECD97", width: "40px",
            borderColor: "#bbbbbb",
            borderWidth: "3px",
            fontSize: "0",
    
          }),
          style({
            opacity: 0.6, offset: 0.5, borderRightColor: "#1ECD97",
            width: "40px",
            borderColor: "#bbbbbb",
            borderWidth: "3px",
            fontSize: "0",
            borderTopColor: "#1ECD97",
    
          }),
          style({
            opacity: 1, offset: 0.8, borderLeftColor: "#1ECD97",
            borderBottomColor: "#1ECD97",
            borderTopColor: "#1ECD97", width: "40px",
            borderColor: "#bbbbbb",
            borderWidth: "3px",
            fontSize: "0",
      
          }),
          style({
            opacity: 0.2, offset: 0.9, border: "#1ECD97", width: "40px",
            borderColor: "#bbbbbb",
            borderWidth: "3px",
            fontSize: "0",
     
            // background:"#1ECD97"
            
          })
        ]))
      ]),
    ]),
  ],

})
export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>) {
  }
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  files: any[] = [];
  progress: any = 0;

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
    setTimeout(() => { this.dialogRef.close();
    }, 1000);
  }
  /**
 * on file drop handler
 */
  onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any): void {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param percentage (File size in bytes)
   * @param decimals (Decimals point)
   *
   */
  formatPercentage(percentage: number, decimals = 2) {
    if (percentage === 0) {
      return "0 %";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["%"];
    const i = Math.floor(Math.log(percentage) / Math.log(k));
    return parseFloat((percentage / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}

