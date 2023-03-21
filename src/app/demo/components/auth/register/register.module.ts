import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { FormLayoutDemoRoutingModule } from '../../uikit/formlayout/formlayoutdemo-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterRoutingModule } from './register-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
		DropdownModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent],
    exports: [RegisterComponent],
})
export class RegisterModule { }
