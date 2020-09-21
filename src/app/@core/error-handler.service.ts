import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastr: ToastrService) { }

  public handleError(error): void {
    this.toastr.error(error.message, 'Oops!');
    // Poderia salvar o erro no graylog, ou base de dados de erro
  }
}
