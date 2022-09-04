import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faEdit, faQuestionCircle, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription, timeout } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import UserChecker from 'src/app/shared/model/user/user.checker';
import { User } from 'src/app/shared/model/user/user.model';

@Component({
    selector: 'app-header-dropdown',
    templateUrl: './header-dropdown.component.html',
    styleUrls: ['./header-dropdown.component.css'],
    animations: [
        trigger('dropdownState', [
            state('hide', style({
                'opacity': '0'
            })),
            state('show', style({
                'opacity': '1'
            })),
            transition('hide => show', animate('20ms ease-in')),
            transition('show => hide', animate('5ms ease-out'))
        ])
    ]
})
export class HeaderDropdownComponent implements OnInit, OnDestroy {
    
    userIcon = faUser;

    editIcon = faEdit;

    questionCircleIcon = faQuestionCircle;

    signOutAltIcon = faSignOutAlt;

    user!: User | null;

    private userSubscription!: Subscription;

    @Input()
        state: boolean = false;

    @Input()
        ignoreClickOutside!: HTMLDivElement[];

    @Output()
        clickOutside = new EventEmitter();

    @Output()
        loginPopupState: EventEmitter<boolean> = new EventEmitter();

    @Output()
        signupPopupState: EventEmitter<boolean> = new EventEmitter();

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.userSubscription = this.authService.authSubject.subscribe(
            res => {
                if (res && UserChecker.test(res)) {
                    this.user = <User>res;
                } else {
                    this.user = null;
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    get dropDownState() {
        return this.state ? 'show' : 'hide';
    }

    onClickedOutside() {
        this.clickOutside.emit();
    }

    onLoginOptionClicked() {
        this.loginPopupState.emit(true);
    }

    onSignUpOptionClick() {
        this.signupPopupState.emit(true);
    }

    onLogout() {
        this.authService.logout();
    }

}
