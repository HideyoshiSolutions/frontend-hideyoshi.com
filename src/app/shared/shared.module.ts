import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickedOutsideDirective } from './directive/clicked-outside/clicked-outside.directive';
import { SliderItemComponent } from './components/slider-item/slider-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './components/popup/popup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CookieConsentModule} from "./cookie-consent/cookie-consent.module";

@NgModule({
    declarations: [
        ClickedOutsideDirective,
        SliderItemComponent,
        PopupComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        CookieConsentModule
    ],
    exports: [
        ClickedOutsideDirective,
        SliderItemComponent,
        PopupComponent
    ]
})
export class SharedModule { }
