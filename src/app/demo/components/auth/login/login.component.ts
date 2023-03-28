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
        if (login) {
            return this.router.navigate([''])
        }
        return
    }

    async onSubmit() {
        Swal.fire({
            title: 'Carregando...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        this.accountService.login(this.login).then((response) => {
            this.router.navigate(['']);
            // salvar resposta no local storage
            // localStorage.setItem('token', response);
            Swal.close();
            console.log(response)
            // localStorage.setItem('token', response);
        })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuário ou senha incorretos!',
                });
            }
            );

    }
    ngOnInit(): void {
        this.layoutService.onMenuToggle();
        this.verifyLogin()
    }

    register() {
        this.router.navigate(['/register']);
    }


}
