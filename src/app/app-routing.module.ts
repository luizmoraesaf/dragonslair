import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'dragons', loadChildren: () => import('./dragons/dragons.module').then(m => m.DragonsModule) },
  // { path: 'unauthorized', data: {animation: 'HomePage'}, component: UnauthorizedComponent, pathMatch: 'full' },
  // { path: 'not-found', data: {animation: 'FilterPage'}, component: NotFoundComponent, pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
