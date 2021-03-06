import { Component, OnInit } from '@angular/core';

// Models
import { Customer } from '../../models/customer.model';

// Services
import { CustomerService } from '../../services/customer/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  customer: Customer = new Customer('', null);

  modalUpdate = 'ocultar';
  cargando = true;

  constructor(
    public _customerService: CustomerService
  ) {}

  ngOnInit() {
    this.cargarClientes();
  }

  hideModalUpdate() {
    this.modalUpdate = 'ocultar';
    this.cargarClientes();
  }

  showModalUpdate( customer: Customer ) {
    this.customer = customer;
    this.modalUpdate = '';
  }

  cargarClientes() {

    this.cargando = true;

    this._customerService.cargarClientes()
                        .subscribe((resp: any) => {
                          this.customers = resp.customers;
                          this.cargando = false;
                        });
  }

  obtenerCliente( customer: Customer ) {

    this._customerService.obtenerCliente(customer)
                          .subscribe((resp: any) => {
                            this.customer = resp.customer;
                          });
  }

  actualizarCliente( customer: Customer ) {

    this._customerService.actualizarCliente(customer)
                          .subscribe( resp => {
                            Swal.fire({
                              icon: 'success',
                              title: 'Cliente actualizado exitosamente',
                              text: 'Customer Id: ' + customer.customerIdCompany
                            });
                            this.cargarClientes()
                            this.hideModalUpdate();
                          });
  }

  borrarCliente( customer: Customer ) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: 'Desea eliminar este recurso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Deseo hacerlo!',
      cancelButtonText: 'No, canelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._customerService.borrarCliente(customer)
                              .subscribe(borrado => {
                                this.cargarClientes();
                              });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El cliente ha sido eliminado',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu recurso está a salvo ;)',
          'error'
        )
      }
    });

  }

}
