import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import Swal from 'sweetalert2';
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.scss']
})
export class NewFoodComponent implements OnInit {

  newFood: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
  ) {
    this.newFood = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
  });
   }

  ngOnInit() {
  }

  save(){

    if (this.newFood.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor preencha todos os campos!',
      });
      //close all modal
          



      return;
    }

    Swal.fire({
      title: 'Cadastrando prato...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
    },
    });


    this.menuService.create(this.newFood.value).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Prato cadastrado com sucesso!',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao cadastrar prato!',
        });
      }
    );
  }

}
