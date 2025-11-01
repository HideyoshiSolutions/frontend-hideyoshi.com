import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {faEnvelope, faFingerprint, faLock, faUser,} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/shared/service/auth.service';
import {HttpError} from 'src/app/shared/model/httpError/httpError.model';
import {User} from 'src/app/shared/model/user/user.model';
import {animate, animateChild, group, query, state, style, transition, trigger,} from '@angular/animations';
import {ValidateEmailValidator} from '../../../shared/validators/validate-email.validator';
import {ValidatePasswordValidator} from '../../../shared/validators/validate-password.validator';
import {ValidateNotEmptyValidator} from '../../../shared/validators/validate-not-empty.validator';
import {Value} from "@sinclair/typebox/value";

const GOOGLE_LOGO_SVG = 'assets/img/providers/google.svg';
const GITHUB_LOGO_SVG = 'assets/img/providers/github.svg';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    animations: [
        trigger('resizeContainerForErrorMessage', [
            state('hide', style({
                height: '100px',
                width: '320px',
            })),
            transition('show => hide', group([
                query('@*', animateChild(), { optional: true }),
                animate('1s ease'),
            ])),
        ]),
        trigger('showErrorMessage', [
            state('show', style({
                opacity: 1,
                height: '100px',
                width: '320px',
            })),
            state('hide', style({
                opacity: 0,
                height: '0px',
                width: '0px',
            })),
            transition('* => show', animate('500ms ease-in')),
        ]),
        trigger('hideAuthContainer', [
            state('hide', style({
                opacity: 0,
            })),
            transition('show => hide', group([
                query('@*', animateChild(), { optional: true }),
                animate('250ms ease-out'),
            ])),
        ]),
    ],
    standalone: false
})
export class SignupComponent implements OnInit {
    @Input()
        state: boolean = false;

    @Input()
        ignoreClickOutside!: HTMLDivElement[];

    @Output()
        stateChange = new EventEmitter<boolean>();

    signupForm!: FormGroup;

    authSubject!: Subscription;

    errorMessage!: string | null;

    isShowErrorMessage = false;

    _fullnameIcon = faFingerprint;

    _emailIcon = faEnvelope;

    _userIcon = faUser;

    _passwordIcon = faLock;

    constructor(
        private authService: AuthService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    ) {
        this.matIconRegistry.addSvgIcon(
            'google-logo',
            this.domSanitizer.bypassSecurityTrustResourceUrl(GOOGLE_LOGO_SVG),
        );
        this.matIconRegistry.addSvgIcon(
            'github-logo',
            this.domSanitizer.bypassSecurityTrustResourceUrl(GITHUB_LOGO_SVG),
        );
    }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            fullname: new FormControl(null, [
                Validators.required,
                ValidateNotEmptyValidator,
            ]),
            // Create a Email Validator
            email: new FormControl(null, [
                Validators.required,
                ValidateEmailValidator,
            ]),
            username: new FormControl(null, [
                Validators.required,
                ValidateNotEmptyValidator,
            ]),
            // Create a Password Validator
            password: new FormControl(null, [
                Validators.required,
                ValidatePasswordValidator,
            ]),
        });
        this.errorMessage = null;
        this.authSubject = this.authService.authSubject.subscribe((res) => {
            this.validateSignup(res);
        });
    }

    onStateChange(state: boolean) {
        this.stateChange.emit(state);
    }

    onSignUp() {
        let user: User = {
            name: this.signupForm.controls['fullname'].value,
            email: this.signupForm.controls['email'].value,
            username: this.signupForm.controls['username'].value,
            password: this.signupForm.controls['password'].value,
        };
        this.authService.signup(user);
    }

    onGoogleLogin() {
        this.authService.googleLogin();
    }

    onGithubLogin() {
        this.authService.githubLogin();
    }

    private validateSignup(res: User | HttpError | null) {
        if (res && Value.Check(User, res)) {
            this.closePopup();
        }
        if (Value.Check(HttpError, res)) {
            this.errorMessage = (<HttpError>res).details;
        }
    }

    private closePopup() {
        this.state = false;
        this.signupForm.reset();
    }

    public showErrorMessage(): string {
        if (this.isShowErrorMessage) {
            return 'show';
        }
        return 'hide';
    }

    public hideErrorMessage(): string {
        if (!!this.errorMessage) {
            return 'hide';
        }
        return 'show';
    }

    hideAuthContainer(event: any) {
        if (event.toState === 'hide') {
            event.element.style.display = 'none';
            this.isShowErrorMessage = true;
        }
    }
}
