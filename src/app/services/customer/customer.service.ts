import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';


import { URL_SERVICES } from '../../config/config';
import { Customer } from '../../models/customer.model';
import { BussinessPartner } from '../../models/bussiness-partner.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(public http: HttpClient) {}

  cargarClientes() {
    const url = URL_SERVICES + '/customers';

    return this.http.get(url);
  }

  obtenerCliente( customer: Customer ) {

    const url = URL_SERVICES + '/customers/' + customer.id;

    return this.http.get(url)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    );
  }

  crearCliente( customer: Customer ) {

    console.log(customer);

    const url = URL_SERVICES + '/customers';

    return this.http.post(url, customer)
                    .pipe(
                      map((resp: any) => {
                      return resp;
                      }),
                      catchError( err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al crear el recurso'
                        });

                        return throwError(err);
                      })
                    );

  }

  borrarCliente( customer: Customer ) {

    const url = URL_SERVICES + '/customers/' + customer.id;

    return this.http.delete(url)
                    .pipe(
                      map((resp: any) => {
                      return resp;
                      }),
                      catchError( err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al eliminar el recurso'
                        });

                        return throwError(err);
                      })
                    );
  }

  actualizarCliente( customer: Customer ) {

    const url = URL_SERVICES + '/customers/' + customer.id;

    return this.http.put(url, customer)
                    .pipe(
                      map((resp: any) => {
                      return resp;
                      }),
                      catchError( err => {

                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al actualizar el recurso'
                        });

                        return throwError(err);
                      })
                    );
  }
}
