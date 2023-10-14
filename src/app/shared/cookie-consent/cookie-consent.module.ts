import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgcCookieConsentConfig,
    NgcCookieConsentModule,
} from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
        domain: 'tinesoft.github.io',
    },
    position: 'bottom-left',
    theme: 'classic',
    palette: {
        popup: {
            background: '#4e4e4e',
            text: '#ffffff',
            link: '#ffffff',
        },
        button: {
            background: '#fa2f22',
            text: '#ffffff',
            border: 'transparent',
        },
    },
    type: 'opt-in',
    content: {
        message:
            'This website uses cookies to ensure you get the best experience on our website.',
        dismiss: 'Got it!',
        deny: 'Refuse cookies',
        link: '',
        href: '',
        policy: 'Cookie Policy',
    },
};

@NgModule({
    declarations: [],
    imports: [CommonModule, NgcCookieConsentModule.forRoot(cookieConfig)],
})
export class CookieConsentModule {}
