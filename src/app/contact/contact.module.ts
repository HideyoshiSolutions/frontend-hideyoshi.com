import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import {ContactRouterModule} from "./contact-router.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        ContactComponent
    ],
    imports: [
        CommonModule,
        ContactRouterModule,
        ReactiveFormsModule
    ]
})
export class ContactModule { }
