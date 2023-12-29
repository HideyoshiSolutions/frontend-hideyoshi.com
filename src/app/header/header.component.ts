import {Component, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef,} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {LoginComponent} from './header-popup/login/login.component';
import {SignupComponent} from './header-popup/signup/signup.component';
import {AuthService} from '../shared/service/auth.service';
import {User} from '../shared/model/user/user.model';
import {Subscription} from 'rxjs';
import {HelpComponent} from './header-popup/help/help.component';
import {MyProfileComponent} from './header-popup/my-profile/my-profile.component';
import {Value} from "@sinclair/typebox/value";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    pages: { name: string; route: string }[] = [
        { name: 'Home', route: '/home' },
        { name: 'Projects', route: '/projects' },
        { name: 'Contact', route: '/home' },
    ];

    userIcon = faUser;

    profileDropdownState: boolean = false;

    navSliderStatus: boolean = false;

    userSliderStatus: boolean = false;

    @ViewChild('profileBtn')
        profileBtnElementRef!: ElementRef;

    @ViewChild('profileDropdown')
        profileDropdownElementRef!: ElementRef;

    @ViewChild('user')
        userElementRef!: ElementRef;

    loggedUser!: User | null;

    private userSubscription!: Subscription;

    private loginComponent!: ComponentRef<LoginComponent>;

    private signupComponent!: ComponentRef<SignupComponent>;

    private myProfileComponent!: ComponentRef<MyProfileComponent>;

    private helpComponent!: ComponentRef<HelpComponent>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.userSubscription = this.authService.authSubject.subscribe(
            (res) => {
                if (res && Value.Check(User, res)) {
                    this.loggedUser = <User>res;
                } else {
                    this.loggedUser = null;
                }
            },
        );
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    public toogleProfileDropdown(): void {
        this.profileDropdownState = !this.profileDropdownState;
    }

    public toogleNavSlider(): void {
        if (this.userSliderStatus) {
            this.userSliderStatus = false;
        } else {
            if (this.navSliderStatus) {
                this.navSliderStatus = false;
            } else {
                this.navSliderStatus = true;
            }
        }
    }

    public profileButtonClicked(): void {
        this.userSliderStatus = true;
    }

    public closeDropdown(): void {
        this.profileDropdownState = false;
    }

    public loginPopupStateChange(state: boolean): void {
        if (state) {
            this.createLoginPopup();
        } else {
            this.closeLoginPopup();
        }
    }

    public signupPopupStateChange(state: boolean): void {
        if (state) {
            this.createSignupPopup();
        } else {
            this.closeSignupPopup();
        }
    }

    myProfilePopupStateChange(state: boolean): void {
        if (state) {
            this.createMyProfilePopup();
        } else {
            this.closeMyProfilePopup();
        }
    }

    helpPopupStateChange(state: boolean): void {
        if (state) {
            this.createHelpPopup();
        } else {
            this.closeHelpPopup();
        }
    }

    private createLoginPopup(): void {
        this.loginComponent =
            this.viewContainerRef.createComponent(LoginComponent);
        this.loginComponent.instance.state = true;

        this.loginComponent.instance.ignoreClickOutside = [
            this.profileBtnElementRef,
            this.profileDropdownElementRef,
            this.userElementRef,
        ].map((element) => element.nativeElement);

        this.loginComponent.instance.stateChange.subscribe((state) => {
            if (!state) {
                this.closeLoginPopup();
            }
        });

        this.navSliderStatus = false;
        this.userSliderStatus = false;
        this.profileDropdownState = false;
    }

    private createSignupPopup() {
        this.signupComponent =
            this.viewContainerRef.createComponent(SignupComponent);
        this.signupComponent.instance.state = true;

        this.signupComponent.instance.ignoreClickOutside = [
            this.profileBtnElementRef,
            this.profileDropdownElementRef,
            this.userElementRef,
        ].map((element) => element.nativeElement);

        this.signupComponent.instance.stateChange.subscribe((state) => {
            if (!state) {
                this.closeSignupPopup();
            }
        });

        this.navSliderStatus = false;
        this.userSliderStatus = false;
        this.profileDropdownState = false;
    }

    private createMyProfilePopup() {
        this.myProfileComponent =
            this.viewContainerRef.createComponent(MyProfileComponent);
        this.myProfileComponent.instance.state = true;
        this.myProfileComponent.instance.user = this.loggedUser;

        this.myProfileComponent.instance.ignoreClickOutside = [
            this.profileBtnElementRef,
            this.profileDropdownElementRef,
            this.userElementRef,
        ].map((element) => element.nativeElement);

        this.myProfileComponent.instance.stateChange.subscribe((state) => {
            if (!state) {
                this.closeMyProfilePopup();
            }
        });

        this.navSliderStatus = false;
        this.userSliderStatus = false;
        this.profileDropdownState = false;
    }

    private createHelpPopup() {
        this.helpComponent =
            this.viewContainerRef.createComponent(HelpComponent);
        this.helpComponent.instance.state = true;

        this.helpComponent.instance.ignoreClickOutside = [
            this.profileBtnElementRef,
            this.profileDropdownElementRef,
            this.userElementRef,
        ].map((element) => element.nativeElement);

        this.helpComponent.instance.stateChange.subscribe((state) => {
            if (!state) {
                this.closeHelpPopup();
            }
        });

        this.navSliderStatus = false;
        this.userSliderStatus = false;
        this.profileDropdownState = false;
    }

    private closeLoginPopup() {
        this.loginComponent.destroy();
    }

    private closeSignupPopup() {
        this.signupComponent.destroy();
    }

    private closeMyProfilePopup() {
        this.myProfileComponent.destroy();
    }

    private closeHelpPopup() {
        this.helpComponent.destroy();
    }
}
