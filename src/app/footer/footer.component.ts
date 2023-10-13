import {Component} from '@angular/core';
import {faGithub, faLinkedinIn, faTwitter} from "@fortawesome/free-brands-svg-icons";


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    _githubIcon = faGithub;

    _twitterIcon = faTwitter;

    _linkedinIcon = faLinkedinIn;
}
