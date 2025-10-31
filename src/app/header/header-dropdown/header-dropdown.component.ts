import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef,} from '@angular/core';
import {faQuestionCircle, faSignIn, faSignOutAlt, faUser,} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/shared/service/auth.service';
import {User} from '../../shared/model/user/user.model';
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {Value} from "@sinclair/typebox/value";

@Component({
    selector: 'app-header-dropdown',
    templateUrl: './header-dropdown.component.html',
    styleUrls: ['./header-dropdown.component.css'],
    animations: [
        trigger('dropdownState', [
            state('hide', style({
                opacity: '0',
            })),
            state('show', style({
                opacity: '1',
            })),
            transition('hide => show', animate('20ms ease-in')),
            transition('show => hide', animate('5ms ease-out')),
        ]),
    ],
    standalone: false
})
export class HeaderDropdownComponent implements OnInit, OnDestroy {
    mainOptions: { text: string, icon: IconDefinition, callback: () => void }[] = [
        {
            text: 'Login',
            icon: faUser,
            callback: () => this.onLoginOptionClicked(),
        },
        {
            text: 'Sign Up',
            icon: faSignIn,
            callback: () => this.onSignUpOptionClick(),
        },
        {
            text: 'Help',
            icon: faQuestionCircle,
            callback: () => this.onHelpClicked(),
        }
    ];

    userOptions: { text: string, icon: IconDefinition, callback: () => void }[] = [
        {
            text: 'My Profile',
            icon: faUser,
            callback: () => this.onMyProfileClicked(),
        },
        {
            text: 'Help',
            icon: faQuestionCircle,
            callback: () => this.onHelpClicked(),
        },
        {
            text: 'Logout',
            icon: faSignOutAlt,
            callback: () => this.onLogout(),
        }
    ];

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

    @Output()
        helpPopupState: EventEmitter<boolean> = new EventEmitter();

    @Output()
        myProfilePopupState: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private viewContainerRef: ViewContainerRef,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.authSubject.subscribe(
            (res) => {
                if (res && Value.Check(User, res)) {
                    this.user = <User>res;
                } else {
                    this.user = null;
                }
            },
        );
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

    onMyProfileClicked() {
        this.myProfilePopupState.emit(true);
    }

    onHelpClicked() {
        this.helpPopupState.emit(true);
    }

    onLogout() {
        this.authService.logout();
    }
}
