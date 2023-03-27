import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { MenuService } from 'src/app/demo/service/menu.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';
import { ButtonModule } from 'primeng/button';
import { MatDialog } from '@angular/material/dialog';
import { NewFoodComponent } from '../../new-food/new-food.component';
import { DialogModule } from 'primeng/dialog';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './listdemo.component.html',
    styleUrls: ['./listdemo.component.css'],
    providers: [MessageService]

})
export class ListDemoComponent implements OnInit {
    @Input() contador: number | undefined;
    @Output() eventoPersonalizado = new EventEmitter();
    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    listMenu: any[] = [];

    myList: any[] = [];

    addNewFood: boolean = false;
    mylistDiaolg: boolean = false;


    newFood: FormGroup | any;

    constructor(
        private productService: ProductService,
        private menuService: MenuService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
        this.newFood = this.fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.messageService.add({severity:'success', summary:'Success Message', detail:'Order submitted'});
        this.list();
        this.productService
            .getProducts()
            .then((data) => (this.products = data));

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' },
        ];

        this.targetCities = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' },
        ];

        this.sortOptions = [
            { label: 'maior para menor', value: '!price' },
            { label: 'menor para maior', value: 'price' },
        ];
        
    }
    
    showSuccess() {
        this.messageService.add({severity:'success', summary:'Success Message', detail:'Order submitted'});
      }

    openDialog(hiddenClose = false): void {
        if (this.addNewFood == true) {
            this.addNewFood = false;
        } else {
            this.addNewFood = true;
        }
    }

    openDialogMyList(hiddenClose = false): void {
        if (this.mylistDiaolg == true) {
            this.mylistDiaolg = false;
        } else {
            this.mylistDiaolg = true;
        }
    }


    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    deleteFood(id: any) {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.menuService.delete(id).subscribe((data) => {
                    this.list();


                    this.messageService.add({severity:'warn', summary:'Deletado', detail:'O prato foi removido do cardapio'});
                }
                ,(error) => {
                    this.messageService.add({severity:'error', summary:'Erro', detail:'Ocorreu um erro ao deletar o prato'});
                }
                );
            }
        });
    }

    

    addMyList(productId: any) {
        const Product = this.listMenu.find((item) => item._id === productId);
        const exist = this.myList.find((item) => item._id === productId);
        if (exist) {
            this.messageService.add({severity:'info', summary:'Já adicionado', detail:'Prato já adicionado, escolha outro!'});
            return;
        }
        Product.onList = true

        this.myList.push(Product);
        this.messageService.add({severity:'success', summary:'Adicionado', detail:'Prato adicionado com sucesso!'});
    }

    removeMyList(productId: any) {
        const Product = this.listMenu.find((item) => item._id === productId)
        const exist = this.myList.find((item) => item._id === productId);
        if (!exist) {
            this.messageService.add({severity:'info', summary:'Já adicionado', detail:'Prato já adicionado, escolha outro!'});
            return;
        }
        Product.onList = false
        this.list();


        this.myList.splice(this.myList.indexOf(Product), 1);
        this.messageService.add({severity:'warn', summary:'Retirado', detail:'Prato retirado de sua lista!'});

    }


    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    async list() {
        this.menuService.list({}).subscribe((data: any) => {
            this.listMenu = data;
        });
    }


    ppr(res:any){
        console.log(res)
    }

    saveNewFood() {
        if (this.newFood.invalid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor preencha todos os campos!',
            });
            //close all modal
            this.addNewFood = false;
            return;

        }
        this.addNewFood = false;

        Swal.fire({
            title: 'Cadastrando prato...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        this.menuService.create(this.newFood.value).subscribe(
            (data) => {
                this.list();
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Prato cadastrado com sucesso!',
                });
                this.addNewFood = false;

            },
            (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Erro ao cadastrar prato!',
                });
                this.addNewFood = false;
            }
        );
    }
    
}
