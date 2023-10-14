import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SliderItemComponent } from 'src/app/shared/components/slider-item/slider-item.component';
import UserChecker from 'src/app/shared/model/user/user.checker';
import { User } from 'src/app/shared/model/user/user.model';

@Component({
    selector: 'app-user-slider',
    templateUrl: './user-slider.component.html',
    styleUrls: ['./user-slider.component.css'],
})
export class UserSliderComponent extends SliderItemComponent implements OnInit {
    userlessOptions = [
        {
            name: 'Login',
            onClick: () => {
                this.onLoginOptionClicked();
            },
        },
        {
            name: 'Signup',
            onClick: () => {
                this.onSignUpOptionClick();
            },
        },
    ];

    userOptions = [
        {
            name: 'My Profile',
            onClick: () => {
                this.onMyProfileClicked();
            },
        },
        {
            name: 'Help',
            onClick: () => {
                this.onHelpClicked();
            },
        },
        {
            name: 'Logout',
            onClick: () => {
                this.onLogout();
            },
        },
    ];

    user!: User | null;

    authSubscription!: Subscription;

    @Output()
    loginPopupState: EventEmitter<boolean> = new EventEmitter();

    @Output()
    signupPopupState: EventEmitter<boolean> = new EventEmitter();

    @Output()
    helpPopupState: EventEmitter<boolean> = new EventEmitter();

    @Output()
    myProfilePopupState: EventEmitter<boolean> = new EventEmitter();

    constructor(private authService: AuthService) {
        super();
    }

    ngOnInit() {
        this.authSubscription = this.authService.authSubject.subscribe(
            (res) => {
                if (UserChecker.test(res)) {
                    this.user = <User>res;
                } else {
                    this.user = null;
                }
            },
        );
    }

    onLoginOptionClicked(): void {
        this.loginPopupState.emit(true);
    }

    onSignUpOptionClick(): void {
        this.signupPopupState.emit(true);
    }

    onMyProfileClicked(): void {
        this.myProfilePopupState.emit(true);
    }

    onHelpClicked(): void {
        this.helpPopupState.emit(true);
    }

    onLogout() {
        this.authService.logout();
    }
}
