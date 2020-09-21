import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../@core/auth-guard.service'
import { DragonListComponent } from './dragon-list/dragon-list.component';
import { DragonDetailsComponent } from './dragon-details/dragon-details.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dragon-list',
        canActivate: [AuthGuard]
    },
    {
        path: 'dragon-list',
        component: DragonListComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
    },
    {
        path: 'dragon-details',
        component: DragonDetailsComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
    },
    {
        path: 'dragon-details/:id',
        component: DragonDetailsComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            routes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class DragonsRoutingModule { }
