import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/demo/service/register.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup | any;

    constructor(
        private fb: FormBuilder,
        private registerService: RegisterService,
        public router: Router,
    ) {
        this.registerForm = this.fb.group({
            email: ['', Validators.required],
            senha: ['', Validators.required],
            telefone: ['', Validators.required],
            nome: ['', Validators.required],
            tipo: ['', Validators.required],
        });
    }
    dropdownItems = [
        { name: 'Empresa', code: 'estabelecimento' },
        { name: 'Visante', code: 'visitante' },
    ];
    selectedState: any = null;
    valRadio: string = '';

    ngOnInit() {}

    save() {
        if (this.registerForm.invalid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor preencha todos os campos corretamente!',
            });
            return;
        }

        Swal.fire({
            title: 'Cadastrando...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        this.registerService.register(this.registerForm.value).subscribe(
            (response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Cadastro realizado com sucesso!',
                    willClose: () => {
                        this.router.navigateByUrl('/login');
                    }
                });
                
            },
            (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: `${error.error.message}`,
                });
            }
        );
    }

    selectedStateChange(value: any) {
        this.registerForm.patchValue({
            tipoDeEstabelecimento: value,
        });
    }

    exit() {
        this.router.navigateByUrl('/login');
    }
}
