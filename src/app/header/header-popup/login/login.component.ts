import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { HttpError } from 'src/app/shared/model/httpError/httpError.model';
import HttpErrorChecker from 'src/app/shared/model/httpError/httpErrorChecker';
import UserChecker from 'src/app/shared/model/user/user.checker';
import { User } from 'src/app/shared/model/user/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input()
        state: boolean = false;

    @Input()
        ignoreClickOutside!: HTMLDivElement[];

    @Output()
        stateChange = new EventEmitter<boolean>();

    popupState = false;

    loginForm!: FormGroup;

    authSubject!: Subscription;

    errorMessage!: string|null;

    _userIcon = faUser;

    _passwordIcon = faLock;

    constructor(
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            'username' : new FormControl(null, [Validators.required]),
            'password' : new FormControl(null, [Validators.required])
        });
        this.errorMessage = null;
        this.authSubject = this.authService.authSubject.subscribe(
            res => {
                this.validateLogin(res);
            }
        );
    }

    ngAfterViewInit(): void {
        this.popupState = this.state;
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

    private validateLogin(res: User|HttpError|null) {
        if (res && UserChecker.test(res)) {
            this.closePopup()
        } if (HttpErrorChecker.test(res)) {
            this.errorMessage = (<HttpError>res).details;
        }

    }

    private closePopup() {
        this.popupState = false;
        this.loginForm.reset();
    }

}
