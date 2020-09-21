import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsService } from './shared/dragons.service';
import { DragonDetailsComponent } from './dragon-details/dragon-details.component';
import { DragonListComponent } from './dragon-list/dragon-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DragonDetailsComponent,
    DragonListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragonsRoutingModule
  ],
  providers: [
    DragonsService
  ]
})
export class DragonsModule { }
