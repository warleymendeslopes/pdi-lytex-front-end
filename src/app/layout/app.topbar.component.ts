import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

import { NewFoodComponent } from '../demo/components/new-food/new-food.component';
import { DialogModule } from 'primeng/dialog';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  eventoPersonalizado = new EventEmitter();

  constructor(
    public layoutService: LayoutService,
    public dialog: MatDialog


  ) { }


  openDialog(hiddenClose = false): void {
    const dialogRef = this.dialog.open(NewFoodComponent, {
      width: '700px',
      panelClass: 'dialogRelative',
      disableClose: true,
      data: {
        hiddenClose,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      // this.ngOnInit();
    });
  }
}
