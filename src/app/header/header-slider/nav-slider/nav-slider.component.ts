import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { SliderItemComponent } from 'src/app/shared/components/slider-item/slider-item.component';
import { User } from '../../../shared/model/user/user.model';
import { AuthService } from '../../../shared/service/auth.service';
import { Subscription } from 'rxjs';
import {Value} from "@sinclair/typebox/value";

@Component({
    selector: 'app-nav-slider',
    templateUrl: './nav-slider.component.html',
    styleUrls: ['./nav-slider.component.css'],
})
export class NavSliderComponent
    extends SliderItemComponent
    implements OnInit, OnDestroy
{
    userIcon = faUser;

    @Input()
        pages!: { name: string; route: string }[];

    loggedUser!: User | null;

    private userSubscription!: Subscription;

    @Output()
        profileButtonClicked = new EventEmitter();

    constructor(private authService: AuthService) {
        super();
    }

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

    onProfileButtonClicked() {
        this.profileButtonClicked.emit();
    }
}
