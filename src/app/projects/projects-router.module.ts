import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from "./projects.component";

const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectsRouterModule {}
