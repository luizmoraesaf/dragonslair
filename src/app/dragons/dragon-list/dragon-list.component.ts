import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonsService } from '../shared/dragons.service';
import { DragonModel } from '../shared/dragon.model';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dragon-list',
  templateUrl: './dragon-list.component.html',
  styleUrls: ['./dragon-list.component.scss']
})
export class DragonListComponent implements OnInit {

  dragons$: Observable<DragonModel[]>;

  constructor(
    private dragonsService: DragonsService,
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Dragons Lair - List');
  }

  ngOnInit(): void {
    this.loadDragons();
  }

  // Carrega os dragões
  private loadDragons(): void {
    this.dragons$ = this.dragonsService.getList();
  }

  // Remove o dragão
  public deleteDragon(id: number): void {
    this.dragonsService.delete(id).subscribe(ret => {
      if (ret) {
        // Sucesso
        this.toastr.success('Dragão removido com sucesso.', 'Oba!');
        // Recarrega a lista
        this.loadDragons();
      }
    });
  }

  // Navega para adição de dragões
  public addDragon(): void {
    // Navega para adicionar novo
    this.router.navigate(['dragons/dragon-details']);
  }
}
