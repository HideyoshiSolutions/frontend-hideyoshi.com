import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../shared/auth/auth.service";
import {User} from "../../../shared/model/user/user.model";
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidateNotEmptyValidator} from "../../../shared/validators/validate-not-empty.validator";
import {ValidatePasswordValidator} from "../../../shared/validators/validate-password.validator";
import {first, take} from "rxjs";
import UserChecker from "../../../shared/model/user/user.checker";
import HttpErrorChecker from "../../../shared/model/httpError/httpErrorChecker";
import {HttpError} from "../../../shared/model/httpError/httpError.model";


@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css'],
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

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.alterForm = new FormGroup({
            'username': new FormControl(null, [Validators.required, ValidateNotEmptyValidator]),
            'password': new FormControl(null, [Validators.required, ValidatePasswordValidator])
        });
        this.errorMessage = null;
    }

    onStateChange(state: boolean) {
        this.stateChange.emit(state);
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

    public onDeleteAccount() {
        this.authService.deleteAccount().subscribe({
            next: (res) => {
                if (res && UserChecker.test(res)) {
                    this.closePopup()
                } if (HttpErrorChecker.test(res)) {
                    this.errorMessage = (<HttpError>res).details;
                }
            }
        })
        // this.authService.logout()
        // this.onStateChange(false);
    }

    public onAddProfilePicture() {
        this.authService.addProfilePicture()
    }

    hideAuthContainer(event: any) {
        if (event.toState === "hide") {
            event.element.style.display = "none";
            this.isShowErrorMessage = true;
        }
    }

    private closePopup() {
        this.onStateChange(false);
    }

}
