import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { AuthService } from '../../../shared/auth/auth.service';
import { User } from '../../../shared/model/user/user.model';
import {
    animate,
    animateChild,
    group,
    query,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidateNotEmptyValidator } from '../../../shared/validators/validate-not-empty.validator';
import { ValidatePasswordValidator } from '../../../shared/validators/validate-password.validator';
import { first, take } from 'rxjs';
import UserChecker from '../../../shared/model/user/user.checker';
import HttpErrorChecker from '../../../shared/model/httpError/httpErrorChecker';
import { HttpError } from '../../../shared/model/httpError/httpError.model';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css'],
    animations: [
        trigger('resizeContainerForErrorMessage', [
            state(
                'hide',
                style({
                    height: '100px',
                    width: '320px',
                }),
            ),
            transition(
                'show => hide',
                group([
                    query('@*', animateChild(), { optional: true }),
                    animate('1s ease'),
                ]),
            ),
        ]),
        trigger('showErrorMessage', [
            state(
                'show',
                style({
                    opacity: 1,
                    height: '100px',
                    width: '320px',
                }),
            ),
            state(
                'hide',
                style({
                    opacity: 0,
                    height: '0px',
                    width: '0px',
                }),
            ),
            transition('* => show', animate('500ms ease-in')),
        ]),
        trigger('hideAuthContainer', [
            state(
                'hide',
                style({
                    opacity: 0,
                }),
            ),
            transition(
                'show => hide',
                group([
                    query('@*', animateChild(), { optional: true }),
                    animate('250ms ease-out'),
                ]),
            ),
        ]),
    ],
})
export class MyProfileComponent implements OnInit {
    @Input()
    state: boolean = false;

    @Input()
    user!: User | null;

    @Input()
    ignoreClickOutside!: HTMLDivElement[];

    @Output()
    stateChange = new EventEmitter<boolean>();

    alterForm!: FormGroup;

    errorMessage!: string | null;

    isShowErrorMessage = false;

    _fileIcon = faFileUpload;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.alterForm = new FormGroup({
            username: new FormControl(null, [
                Validators.required,
                ValidateNotEmptyValidator,
            ]),
            password: new FormControl(null, [
                Validators.required,
                ValidatePasswordValidator,
            ]),
        });
        this.errorMessage = null;
    }

    onStateChange(state: boolean) {
        this.stateChange.emit(state);
    }

    showErrorMessage(): string {
        if (this.isShowErrorMessage) {
            return 'show';
        }
        return 'hide';
    }

    hideErrorMessage(): string {
        if (!!this.errorMessage) {
            return 'hide';
        }
        return 'show';
    }

    onDeleteAccount() {
        this.authService.deleteAccount().subscribe({
            next: (response: any) => {
                this.authService.logout();
            },
        });
        this.closePopup();
    }

    hideAuthContainer(event: any) {
        if (event.toState === 'hide') {
            event.element.style.display = 'none';
            this.isShowErrorMessage = true;
        }
    }

    onProfilePictureSent(event: any) {
        if (event) {
            this.closePopup();
        }
    }

    private closePopup() {
        this.onStateChange(false);
    }
}
