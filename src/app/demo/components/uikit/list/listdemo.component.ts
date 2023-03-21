import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { MenuService } from 'src/app/demo/service/menu.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './listdemo.component.html',
})
export class ListDemoComponent implements OnInit {
    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    listMenu: any[] = [];

    constructor(
        private productService: ProductService,
        private menuService: MenuService
    ) {}

    ngOnInit() {
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

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    async list() {
     this.menuService.list({}).subscribe((data: any) => {
        this.listMenu = data;
        console.log("list----->",data)
     });
    }
}
