import { Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './header-popup/login/login.component';
import { SignupComponent } from './header-popup/signup/signup.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    userIcon = faUser;

    profileDropdownState: boolean = false;

    signupPopupState: boolean = false;

    navSliderStatus: boolean = false;
    userSliderStatus: boolean = false;

    @ViewChild('profileBtn')
        profileBtnElementRef!: ElementRef;
    
    @ViewChild('profileDropdown')
        profileDropdownElementRef!: ElementRef;
    
    @ViewChild('user')
        userElementRef!: ElementRef;

    private loginComponent!: ComponentRef<LoginComponent>;

    private signupComponent!: ComponentRef<SignupComponent>;

    constructor(private viewContainerRef: ViewContainerRef) { }


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

    public closeNavSlider(): void {
        if (this.userSliderStatus) {
            this.userSliderStatus = false;
        } else {
            this.navSliderStatus = false;   
        }
    }

    public loginPopupStateChange(state: boolean): void {

        if (state) {
            this.createLoginPopup();
        } else {
            this.closeLoginPopup();
        }

    }

    private createLoginPopup(): void {
        this.loginComponent = this.viewContainerRef.createComponent(LoginComponent);
        this.loginComponent.instance.state = true;

        this.loginComponent.instance.ignoreClickOutside = [
            this.profileBtnElementRef,
            this.profileDropdownElementRef,
            this.userElementRef
        ].map(element => element.nativeElement);

        this.loginComponent.instance.stateChange.subscribe(
            state => {
                if (!state) {
                    this.closeLoginPopup()
                }
            }
        );

        this.navSliderStatus = false;
        this.userSliderStatus = false;
    }

    private createSignupPopup() {
        this.signupComponent = this.viewContainerRef.createComponent(SignupComponent);
        this.signupComponent.instance.state = true;

        this.signupComponent.instance.ignoreClickOutside = [
            this.profileBtnElementRef,
            this.profileDropdownElementRef,
            this.userElementRef
        ].map(element => element.nativeElement);

        this.signupComponent.instance.stateChange.subscribe(
            state => {
                if (!state) {
                    this.closeSignupPopup()
                }
            }
        );

        this.navSliderStatus = false;
        this.userSliderStatus = false;
    }

    private closeLoginPopup() {
        this.loginComponent.destroy();
    }

    private closeSignupPopup() {
        this.signupComponent.destroy();
    }

    public signupPopupStateChange(state: boolean): void {
        this.signupPopupState = state;

        if (state) {
            this.createSignupPopup();
        } else {
            this.closeSignupPopup();
        }

    }

}