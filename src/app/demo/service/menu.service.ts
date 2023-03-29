import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { TestBed } from '@angular/core/testing';
@Injectable({
    providedIn: 'root',
})
export class MenuService {
    constructor(
        private http: HttpClient,
        ) {}

    list(filter:Object): Observable<any> {
        return this.http.get(`${environment.api}/menu`);
    }

    create(data: Object): Observable<any> {
        return this.http.post(`${environment.api}/menu`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${environment.api}/menu/${id}`);
    }


   // this.accountService.LyObtainToken();
   /**
    * Esta funcao e resposavel por criar o token de acesso a plataforma da Lytex Pagamentos 
    * ela deve retornar somente o accessToken que sera usado para gerar faturas 
    */
    async LyObtainToken(){
        const body =   {
            "grantType": "clientCredentials",
            "clientId": "64231ce5cbc72e000bd20ebb",
            "clientSecret":"woaWpvBTIcupiz9iwe8Um0vsj837OmjaoxFMyaWEGce03J0veCdgQtnrneysYkB1otqPHq2a2GZuHNZD38i1gacjUtOrN6odFrL4fuGcN3OUlPyoDDsyzWHVSziUv9p7M6sQFG6BQmycvJlYcr6cLILoPkQSFGzKfDzdG1r1EZSSBWzWMJiW7IJ7m4CFh6BwN9RriELBgIjHYUcRT3zBiwuXTBtnwExymyIetKA8Mrxa9xDg7JiiwX7qiYnKgctz",
            "scopes": [
                  "client",
                  "invoice",
                  "paymentLink",
                  "product"
            ]
        }
       return  await this.http.post<any>(`${environment.apiLyAuth}/oauth/obtain_token`, body).toPromise();

      }








    // async invoice(product:any, mesa:any){


    //   await  this.LyObtainToken()
    //   .then((res)=>{
    //     const Token = res.accessToken;

    //     const headers = new HttpHeaders()
    //     .set('Content-Type', 'application/json')
    //     .set('Authorization', 'Bearer ' + Token);

    //     var todayDate = new Date().toISOString().slice(0, 10);
    //     let Body= {
    //     "dueDate": todayDate+"T03:00:00.000Z",
    //     "items": product,
    //     "mulctAndInterest": {
    //         "enable": true,
    //         "mulct": {
    //             "value": 2,
    //             "type": "percentage"
    //         },
    //         "interest": {
    //             "value": 1,
    //             "type": "percentage"
    //         }
    //     },
    //     "client": mesa,
    //     "paymentMethods": {
    //         "creditCard": {
    //             "enable": false
    //         },
    //         "pix": {
    //             "enable": true
    //         },
    //         "boleto": {
    //             "enable": true
    //         }
    //     },
    //     "notifications": [
    //         {
    //             "channel": "email",
    //             "event": "invoiceCreate"
    //         },
    //         {
    //             "channel": "email",
    //             "event": "invoiceChange"
    //         },
    //         {
    //             "channel": "email",
    //             "event": "beforeOverdue",
    //             "beforeOverdue": {
    //                 "days": 3
    //             }
    //         },
    //         {
    //             "channel": "email",
    //             "event": "expirationDay"
    //         },
    //         {
    //             "channel": "email",
    //             "event": "afterOverdue",
    //             "afterOverdue": {
    //                 "daysInit": 3,
    //                 "daysInterval": 3,
    //                 "daysDuration": 3
    //             }
    //         },
    //         {
    //             "channel": "email",
    //             "event": "invoicePaid"
    //         }
    //     ],
    //     "cancelOverdueDays": 29
    //     }
        
    //     this.http.post(`${environment.apiLyInvoice}/invoices`, Body, { headers }).subscribe(
    //         (res) => {
    //           return res;
    //         },
    //         (err) => {
    //           console.error(err);
    //         }
    //       );


    //   })



    // }

    async invoice(product:any, mesa:any) {
        try {
          const token = await this.LyObtainToken().then(res => res.accessToken);
      
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token);
      
          const todayDate = new Date().toISOString().slice(0, 10);
          const body = {
            "dueDate": todayDate + "T03:00:00.000Z",
            "items": product,
            "mulctAndInterest": {
              "enable": true,
              "mulct": {
                "value": 2,
                "type": "percentage"
              },
              "interest": {
                "value": 1,
                "type": "percentage"
              }
            },
            "client": mesa,
            "paymentMethods": {
              "creditCard": {
                "enable": false
              },
              "pix": {
                "enable": true
              },
              "boleto": {
                "enable": true
              }
            },
            "notifications": [
              {
                "channel": "email",
                "event": "invoiceCreate"
              },
              {
                "channel": "email",
                "event": "invoiceChange"
              },
              {
                "channel": "email",
                "event": "beforeOverdue",
                "beforeOverdue": {
                  "days": 3
                }
              },
              {
                "channel": "email",
                "event": "expirationDay"
              },
              {
                "channel": "email",
                "event": "afterOverdue",
                "afterOverdue": {
                  "daysInit": 3,
                  "daysInterval": 3,
                  "daysDuration": 3
                }
              },
              {
                "channel": "email",
                "event": "invoicePaid"
              }
            ],
            "cancelOverdueDays": 29
          };
      
          const res = await this.http.post(`${environment.apiLyInvoice}/invoices`, body, { headers }).toPromise();
          return res;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
      



}
