import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { faEnvelope, faFingerprint, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HttpError } from 'src/app/shared/model/httpError/httpError.model';
import HttpErrorChecker from 'src/app/shared/model/httpError/httpErrorChecker';
import UserChecker from 'src/app/shared/model/user/user.checker';
import { User } from 'src/app/shared/model/user/user.model';


const GOOGLE_LOGO_SVG = "assets/img/providers/google.svg";
const GITHUB_LOGO_SVG = "assets/img/providers/github.svg";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
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

    _fullnameIcon = faFingerprint;

    _emailIcon = faEnvelope;

    _userIcon = faUser;

    _passwordIcon = faLock;

    constructor(private authService: AuthService,
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
        this.signupForm = new FormGroup({
            'fullname': new FormControl(null, [Validators.required]),
            // Create a Email Validator
            'email': new FormControl(null, [Validators.required]),
            'username': new FormControl(null, [Validators.required]),
            // Create a Password Validator
            'password': new FormControl(null, [Validators.required])
        });
        this.errorMessage = null;
        this.authSubject = this.authService.authSubject.subscribe(
            res => {
                this.validateSignup(res);
            }
        );
    }

    onStateChange(state: boolean) {
        this.stateChange.emit(state);
    }

    onSignUp() {
        let user: User = {
            name: this.signupForm.controls['fullname'].value,
            email: this.signupForm.controls['email'].value,
            username: this.signupForm.controls['username'].value,
            password: this.signupForm.controls['password'].value
        }
        this.authService.signup(user);
    }

    onGoogleLogin() {
        this.authService.googleLogin();
    }

    onGithubLogin() {
        this.authService.githubLogin();
    }

    private validateSignup(res: User | HttpError | null) {
        if (res && UserChecker.test(res)) {
            this.closePopup()
        } if (HttpErrorChecker.test(res)) {
            this.errorMessage = (<HttpError>res).details;
        }

    }

    private closePopup() {
        this.state = false;
        this.signupForm.reset();
    }


}
