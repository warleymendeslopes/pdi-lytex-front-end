import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/demo/service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './shared/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    login = {
        email: '',
        senha: ''
    };

    valCheck: string[] = ['remember'];

    password!: string;

    username!: string;

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private loginService: LoginService,
        private fb: FormBuilder,
        private accountService: AccountService,
    ) { }

    async verifyLogin() {
        const login = localStorage.getItem('user')
        if(login){
            this.router.navigate(['/painel']); 
        }
        return
    }

    getToken(){
        return this.accountService.getAuthorizationToken()
    }

    async onSubmit() {
        Swal.fire({
            title: 'Carregando...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const result = await this.accountService.login(this.login);
            console.log(`Login efetuado: ${result}`);
            this.router.navigate(['/painel']);
            Swal.close();
         } catch (error) {
           console.error(error);
           Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuário ou senha incorretos!',
            });
          }
          

    }








    ngOnInit(): void {
        this.layoutService.onMenuToggle();
        this.verifyLogin()
    }

    register() {
        this.router.navigate(['/register']);
    }


}
