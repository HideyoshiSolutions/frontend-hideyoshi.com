import {NgModule} from "@angular/core";
import {ProjectsComponent} from "./projects.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { ProjectCardComponent } from './project-card/project-card.component';
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
    declarations: [
        ProjectsComponent,
        ProjectCardComponent
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        MatIconModule,
        FontAwesomeModule,
        NgApexchartsModule
    ],
    exports: []
})
export class ProjectsModule { }
