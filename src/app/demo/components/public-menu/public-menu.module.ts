
import { NgModule } from '@angular/core';
import {MenuComponent} from './menu/menu.component'
import {PublicMenuRouting} from './puclic-menu-routing.module'

@NgModule({
  imports: [
    PublicMenuRouting
  ],
  declarations: [MenuComponent,]
})
export class PublicMenuModule { }
