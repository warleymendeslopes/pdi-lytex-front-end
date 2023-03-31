import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDemoComponent } from './listdemo.component';
import { ListDemoRoutingModule } from './listdemo-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NewFoodComponent } from '../../new-food/new-food.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgxCurrencyModule } from 'ngx-currency';

import { InputNumberModule } from 'primeng/inputnumber';

import { RequiredRolesDirective } from 'src/app/demo/directive/required-roles.directive';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ListDemoRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
		DialogModule,
        FormsModule,
        ReactiveFormsModule,
		VirtualScrollerModule,
		TableModule,
		SplitButtonModule,
		ToastModule,
		ConfirmDialogModule,
		MatSnackBarModule,
		ProgressSpinnerModule,
		NgxCurrencyModule,
		InputNumberModule
	],
	declarations: [ListDemoComponent,NewFoodComponent, RequiredRolesDirective]
})
export class ListDemoModule { }
