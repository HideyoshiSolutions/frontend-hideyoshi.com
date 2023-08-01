import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HttpError } from 'src/app/shared/model/httpError/httpError.model';
import HttpErrorChecker from 'src/app/shared/model/httpError/httpErrorChecker';
import UserChecker from 'src/app/shared/model/user/user.checker';
import { User } from 'src/app/shared/model/user/user.model';
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";


const GOOGLE_LOGO_SVG = "assets/img/providers/google.svg";
const GITHUB_LOGO_SVG = "assets/img/providers/github.svg";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [
        trigger('resizeContainerForErrorMessage', [
            state('hide',
                style({
                    height: '100px',
                    width: '320px',
                })
            ),
            transition(
                'show => hide',
                group([
                    query(
                        "@*",
                        animateChild(),
                        { optional: true }
                    ),
                    animate('1s ease')
                ])
            )
        ]),
        trigger('showErrorMessage', [
            state('show',
                style({
                    opacity: 1,
                    height: '100px',
                    width: '320px',
                })
            ),
            state('hide',
                style({
                    opacity: 0,
                    height: '0px',
                    width: '0px',
                })
            ),
            transition(
                '* => show',
                animate(
                    '500ms ease-in'
                )
            ),
        ]),
        trigger('hideAuthContainer', [
            state('hide',
                style({
                    opacity: 0,
                })
            ),
            transition(
                'show => hide',
                group([
                    query(
                        "@*",
                        animateChild(),
                        { optional: true }
                    ),
                    animate(
                        '250ms ease-out'
                    )
                ])
            )
        ]),
    ]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
        state: boolean = false;

    @Input()
        ignoreClickOutside!: HTMLDivElement[];

    @Output()
        stateChange = new EventEmitter<boolean>();

    loginForm!: FormGroup;

    authSubject!: Subscription;

    errorMessage!: string | null;

    isShowErrorMessage = false;

    _userIcon = faUser;

    _passwordIcon = faLock;

    constructor(
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
            "google-logo",
            this.domSanitizer.bypassSecurityTrustResourceUrl(GOOGLE_LOGO_SVG)
        );
        this.matIconRegistry.addSvgIcon(
            "github-logo",
            this.domSanitizer.bypassSecurityTrustResourceUrl(GITHUB_LOGO_SVG)
        );
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required])
        });
        this.errorMessage = null;
        this.authSubject = this.authService.authSubject.subscribe(
            res => {
                this.validateLogin(res);
            }
        );
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        this.authSubject.unsubscribe();
    }

    onStateChange(state: boolean) {
        this.stateChange.emit(state);
    }

    onLogin() {
        let user: User = {
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
        }
        this.authService.login(user);
    }

    onGoogleLogin() {
        this.authService.googleLogin();
    }

    onGithubLogin() {
        this.authService.githubLogin();
    }

    private validateLogin(res: User | HttpError | null) {
        if (res && UserChecker.test(res)) {
            this.closePopup()
        } if (HttpErrorChecker.test(res)) {
            this.errorMessage = (<HttpError>res).details;
        }

    }

    private closePopup() {
        this.state = false;
        this.loginForm.reset();
    }

    public showErrorMessage(): string {
        if (this.isShowErrorMessage) {
            return "show";
        }
        return "hide";
    }

    public hideErrorMessage(): string {
        if (!!this.errorMessage) {
            return "hide";
        }
        return "show";
    }

    hideAuthContainer(event: any) {
        if (event.toState === "hide") {
            event.element.style.display = "none";
            this.isShowErrorMessage = true;
        }
    }

}
