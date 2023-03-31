import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

import { NewFoodComponent } from '../demo/components/new-food/new-food.component';
import { DialogModule } from 'primeng/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../demo/components/auth/login/shared/account.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


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

  token!: any;
  TokenData: any

  constructor(
    public layoutService: LayoutService,
    public dialog: MatDialog,
    private accountService: AccountService,
    public router: Router,
 


  ) { }



ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  // recuperar token de usuario
  this.token = this.accountService.getAuthorizationToken();
  

  this.getAllData();
  
}




async getAllData(){
  this.TokenData = await this.accountService.getDataToken(this.token);


}

logout() {
  Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair!'
  }).then((result) => {
      if (result.isConfirmed) {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
      } else {
          return
      }


  })


}


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
