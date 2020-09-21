import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../@core/authentication.service';
import { FormUtils } from '../@shared/form-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;
  public FormUtils = FormUtils;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Dragons Lair - Login');
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });

    // Valida se já não está autenticado
    if (this.authService.isAuthenticated.value) {
      this.router.navigate(['dragons']);
    }
  }

  public login(): void {
    if (this.authService.authenticate(this.formGroup.get('email').value, this.formGroup.get('password').value)) {
      this.router.navigate(['dragons']);
    } else {
      this.toastr.error('Dados incorretos, verifique seu e-mail e senha.', 'Oops!');
    }
  }

  public showWarningToValidateFields(formControl): boolean {
    return !this.FormUtils.checkFormControlValidity(formControl) && this.FormUtils.checkIfFormControlIsTouched(formControl);
  }
}
