import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickedOutsideDirective} from './directive/clicked-outside/clicked-outside.directive';
import {SliderItemComponent} from './components/slider-item/slider-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {PopupComponent} from './components/popup/popup.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CookieConsentModule} from './cookie-consent/cookie-consent.module';

@NgModule({ declarations: [
        ClickedOutsideDirective,
        SliderItemComponent,
        PopupComponent,
    ],
    exports: [ClickedOutsideDirective, SliderItemComponent, PopupComponent], imports: [CommonModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        CookieConsentModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule {}
