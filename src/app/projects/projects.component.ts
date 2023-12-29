import {Component, OnInit} from '@angular/core';
import {GithubService} from "../shared/service/github.service";
import {Project} from "../shared/model/project/project.model";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projects!: Project[];

    constructor(private githubService: GithubService) {
    }

    ngOnInit(): void {
        this.projects = [];
        this.githubService.getProjects().subscribe((project: Project) => {
            this.projects.push(project);
        });
    }

    identifyProject(index: number, project: Project) {
        return project.name;
    }

}
