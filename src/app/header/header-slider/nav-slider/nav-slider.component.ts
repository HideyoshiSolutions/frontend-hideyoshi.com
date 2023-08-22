import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { SliderItemComponent } from 'src/app/shared/components/slider-item/slider-item.component';
import UserChecker from "../../../shared/model/user/user.checker";
import {User} from "../../../shared/model/user/user.model";
import {AuthService} from "../../../shared/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-nav-slider',
    templateUrl: './nav-slider.component.html',
    styleUrls: ['./nav-slider.component.css']
})
export class NavSliderComponent extends SliderItemComponent implements OnInit, OnDestroy {

    userIcon = faUser;

    navLink = [
        { page: "Home", link: "/home" },
        { page: "Work", link: "/home" },
        { page: "Contact", link: "/home" },
        { page: "About", link: "/home" }
    ]

    loggedUser!: User | null;

    private userSubscription!: Subscription;

    @Output()
        profileButtonClicked = new EventEmitter();

    constructor(private authService: AuthService) {
        super();
    }

    ngOnInit(): void {
        this.userSubscription = this.authService.authSubject.subscribe(
            res => {
                console.log(UserChecker.test(res));
                if (res && UserChecker.test(res)) {
                    this.loggedUser = <User>res;
                } else {
                    this.loggedUser = null;
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onProfileButtonClicked() {
        this.profileButtonClicked.emit();
    }

}
