import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from "./contact.component";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: ContactComponent
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})
export class ContactRouterModule {}
