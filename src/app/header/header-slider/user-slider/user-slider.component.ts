import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SliderItemComponent } from 'src/app/shared/components/slider-item/slider-item.component';
import UserChecker from 'src/app/shared/model/user/user.checker';
import { User } from 'src/app/shared/model/user/user.model';

@Component({
    selector: 'app-user-slider',
    templateUrl: './user-slider.component.html',
    styleUrls: ['./user-slider.component.css']
})
export class UserSliderComponent extends SliderItemComponent implements OnInit {
    
    userlessOptions = [
        {
            name: "Login",
            onClick: () => {
                this.loginOptionClicked();
            }
        },
        {
            name: "Signup",
            onClick: () => {
                this.signupOptionClicked();
            }
        }
    ]

    userOptions = [
        {
            name: "My Profile",
            onClick: () => {}
        },
        {
            name: "Help",
            onClick: () => {}
        },
        {
            name: "Logout",
            onClick: () => {
                this.onLogout();
            }
        }
    ]

    user!: User|null;

    authSubscription!: Subscription;


    @Output()
        loginPopupState = new EventEmitter<boolean>();

    @Output()
        signupPopupState = new EventEmitter<boolean>();

    constructor(private authService: AuthService) {
        super();
    }

    ngOnInit() {
        this.authSubscription = 
            this.authService.authSubject.subscribe(
                res => {
                    if (UserChecker.test(res)) {
                        this.user = <User>res;
                    } else {
                        this.user = null;
                    }
                }
            )
    }

    loginOptionClicked(): void {
        this.loginPopupState.emit(true);
    }

    signupOptionClicked(): void {
        this.signupPopupState.emit(true);
    }

    onLogout() {
        this.authService.logout();
    }

}
