import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoneyFormatService {

constructor() { }

}
export function formatMoney(value: number): string {
  const money = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return money ;
}
