import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/demo/service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    valCheck: string[] = ['remember'];

    senha!: string;

    username!: string;
    loginForm: FormGroup | any;
    register: boolean = false;

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private loginService: LoginService,
        private fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            senha: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.layoutService.onMenuToggle();
    }

    onLogin() {
        if (this.loginForm.invalid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor preencha todos os campos corretamente!',
            });
            return;
        }

        Swal.fire({
            title: 'Aguarde...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        this.loginService
            .login(this.loginForm.value)
            .toPromise()
            .then((res: any) => {
                localStorage.setItem('token', res.access_token);
                localStorage.setItem('email', this.loginForm.value.email);
                localStorage.setItem('userid', res._id);
                Swal.close();
                this.router.navigateByUrl('/init');
            })
            .catch((err: any) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.error.message}}`,
                });
            });
    }

    goToRegister() {
        this.router.navigateByUrl('/register');
    }
}
