import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './header/header-popup/callback/callback.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    },
    {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(mod => mod.ProjectsModule),
    },
    {
        path: 'callback',
        component: CallbackComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRouterModule {}
