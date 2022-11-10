import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit(): void {

        this.route.queryParams.subscribe(p => {

            let auth: 'google' | 'github' = p['auth'];

            if (auth === 'google') {
                this.loginGoogle(p);
            } else if (auth === 'github') {
                this.loginGithub(p);
            }

            this.router.navigate(['/home'])

        })
    }

    private loginGoogle(p: any) {
        this.authService.loginGoogleUser(p)
    }

    private loginGithub(p: any) {
        this.authService.loginGithubUser(p)
    }

}
