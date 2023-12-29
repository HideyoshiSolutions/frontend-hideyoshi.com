import {Component, Input} from '@angular/core';
import { faCodeFork, faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import {Project} from "../../shared/model/project/project.model";
import {faScaleBalanced} from "@fortawesome/free-solid-svg-icons/faScaleBalanced";

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
    @Input() inverted: boolean = false;

    @Input() project!: Project;

    // Stats Icons Definitions
    faLicense = faScaleBalanced;

    faStars = faStar;

    faCodeFork = faCodeFork;

    faEye = faEye;

    get hasLicense(): boolean {
        return this.project.license !== undefined;
    }

    get hasLanguage(): boolean {
        return this.project.languages !== undefined &&
            this.project.languages?.length > 0;
    }
}
