import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((p) => {
            let auth: 'google' | 'github' = p['auth'];

            switch (auth) {
            case 'github':
                this.authService.loginGithubUser(p);
                break;
            case 'google':
                this.authService.loginGoogleUser(p);
                break;
            default:
                console.log(`Unimplemented auth: ${auth}`);
                break;
            }

            this.router.navigate(['/home']);
        });
    }
}
