import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormUtils } from '../../@shared/form-utils';
import { Title } from '@angular/platform-browser';
import { PageModeEnum } from '../shared/page-mode.enum';
import { DragonsService } from '../shared/dragons.service';
import { DragonModel } from '../shared/dragon.model';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: ['./dragon-details.component.scss']
})
export class DragonDetailsComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public FormUtils = FormUtils;
  public pageModeEnum = PageModeEnum;
  public pageMode = PageModeEnum.Add;
  private selectedDragon: DragonModel;
  private id = 0;
  private subscriptions$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dragonsService: DragonsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    // Inicializa os forms
    this.createForms();
    // Obtem o id da rota, caso tenha
    this.id = this.route.snapshot.params['id'];
    // Gerencia o modo da página
    this.managePageMode();
  }

  ngOnDestroy(): void {
    // Evita memory leaks
    this.subscriptions$.unsubscribe();
  }

  // Inicializa o form
  private createForms(): void {
    this.formGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      type: ['', Validators.required],
      createdAt: [{ value: new Date(), disabled: true }],
      history: ['']
    });
  }

  // Gerencia a página de acordo com o que recebe de parâmetro
  private managePageMode(): void {
    //Caso esteja visualizando
    if (this.id > 0) {
      this.subscriptions$.add(this.dragonsService.get(this.id).subscribe(dragon => {
        if (dragon) {
          // Ajusta o modo da página
          this.pageMode = PageModeEnum.Visualize;
          // Armazena o dragão carregado
          this.selectedDragon = dragon;
          // Ajusta o title da tela
          this.titleService.setTitle(`Dragons Lair - Detalhes do ${this.selectedDragon.name}`);
          // Patch no form
          this.formGroup.patchValue(this.selectedDragon);
          // Ajusta a data para ficar amigável
          this.formGroup.get('createdAt').setValue(this.setDateToUTC(this.selectedDragon.createdAt));
          // Desabilita o campo para visualização
          this.formGroup.disable();
        }
      }, () => {
        // Em caso de erro, desabilita os campos
        this.formGroup.disable();
      }));
    } else { //Caso esteja incluindo
      // Ajusta o modo da página
      this.pageMode = PageModeEnum.Add;
      // Ajusta o title da tela
      this.titleService.setTitle('Dragons Lair - Novo dragão');
    }
  }

  // Método responsável por cancelar a ação no form
  public cancel(): void {
    // Volta para listagem
    this.router.navigate(['dragons']);
  }

  // Método responsável por editar os dados no form
  public edit(): void {
    // Ajusta o modo da página
    this.pageMode = PageModeEnum.Edit;
    // Habilita os campos
    this.formGroup.enable();
    // Marca como touched para styles corretos
    this.formGroup.markAllAsTouched()
  }

  // Método responsável por salvar os dados no form
  public save(): void {
    // Caso seja um novo dragão
    if (this.pageMode === PageModeEnum.Add) {
      // Valida os campos
      if (this.validatePageForm()) {
        this.subscriptions$.add(this.dragonsService.add(this.formGroup.getRawValue()).subscribe(ret => {
          if (ret) {
            // Sucesso
            this.toastr.success('Dragão incluido com sucesso.', 'Oba!');
            // Navega para listagem
            this.router.navigate(['dragons']);
          }
        }));
      }
    } else if (this.pageMode === PageModeEnum.Edit) { // Caso esteja editando um dragão
      // Valida os campos
      if (this.validatePageForm()) {
        this.subscriptions$.add(this.dragonsService.update(this.formGroup.getRawValue()).subscribe(ret => {
          if (ret) {
            // Sucesso
            this.toastr.success('Dragão alterado com sucesso.', 'Oba!');
            // Navega para listagem
            this.router.navigate(['dragons']);
          }
        }));
      }
    }
  }

  // Ajusta a data para UTC
  private setDateToUTC(date): String {
    return (moment(date).utc().format('DD-MM-YYYY HH:mm:ss'));
  }

  // Valida o form da página
  private validatePageForm(): boolean {
    return this.formGroup.valid;
  }

  // Retorna se precisa ou não exibir as mensagens para o usuário validar os formsFields
  public showWarningToValidateFields(formControl): boolean {
    return this.pageMode !== PageModeEnum.Visualize && !this.formIsAllValid(formControl);
  }

  // Retorna se todas validações necessárias estão corretas
  private formIsAllValid(formControl: FormControl): boolean {
    return this.FormUtils.checkFormControlValidity(formControl) && this.FormUtils.checkIfFormControlIsTouched(formControl);
  }

}
