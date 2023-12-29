import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from "./home.component";
import {StackSliderComponent} from "./stack-slider/stack-slider.component";
import {StackCardComponent} from "./stack-slider/stack-card/stack-card.component";
import {NgxGlideComponent} from "ngx-glide";
import {HomeRouterModule} from "./home-router.module";



@NgModule({
    declarations: [
        HomeComponent,
        StackSliderComponent,
        StackCardComponent
    ],
    imports: [
        CommonModule,
        NgxGlideComponent,
        NgOptimizedImage,
        HomeRouterModule
    ]
})
export class HomeModule { }
