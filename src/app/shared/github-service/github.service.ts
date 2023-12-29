import { Injectable } from '@angular/core';
import {Language, Project} from "../model/project/project.model";
import {HttpClient} from "@angular/common/http";
import {
    map, mergeMap,
    Observable,
    pipe, switchMap, take
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GithubService {

    GITHUB_API_URL = 'https://api.github.com';

    GITHUB_API_COLORS = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';

    GITHUB_USER = environment.githubUser;

    colors!: Map<string, string>;

    constructor(private http: HttpClient) {
        this.getLanguageColor().subscribe((colors: Map<string, string>) => {
            this.colors = colors;
        });
    }

    getProjects(): Observable<Project> {
        return this.http.get(this.apiReposString()).pipe(
            map((projects: any) => {
                return projects.map((project: any) => {
                    return {
                        name: project.name,
                        description: project.description,
                        license: project.license?.key,
                        link: project.html_url,

                        stars: project.stargazers_count,
                        forks: project.forks_count,
                        watchers: project.watchers_count
                    } as Project;
                }).filter((project: Project) => {
                    return project.name !== this.GITHUB_USER;
                });
            }),
            switchMap((projects: Project[]) => {
                return new Observable<Project>((observer) => {
                    projects.forEach((project: Project, index: number) => {
                        this.getProjectLanguage(project).subscribe((languages: Language[]) => {
                            project.languages = languages;
                            observer.next(project);
                        });
                    });
                });
            })
        )
    }

    private getProjectLanguage(project: Project): Observable<Language[]> {
        return this.http.get(this.apiRepoLanguagesString(project.name)).pipe(
            map((languages: any) => {
                let totalBytes = 0;
                Object.keys(languages).forEach((language: string) => {
                    totalBytes += languages[language];
                });

                return Object.keys(languages).map((language: string) => {
                    return {
                        name: language,
                        color: this.colors.get(language) || this.getRandColor(),
                        percentage: (languages[language]/totalBytes)*100
                    } as Language;
                });
            })
        );
    }

    private getLanguageColor(): Observable<Map<string, string>> {
        return this.http.get(this.GITHUB_API_COLORS).pipe(
            map((colors: any) => {
                const colorMap = new Map<string, string>();
                Object.keys(colors).forEach((language: string) => {
                    colorMap.set(language, colors[language].color);
                });
                return colorMap;
            })
        );
    }

    private getRandColor(): string {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    private apiReposString() {
        return `${this.GITHUB_API_URL}/users/${this.GITHUB_USER}/repos`;
    }

    private apiRepoLanguagesString(repoName: string) {
        return `${this.GITHUB_API_URL}/repos/${this.GITHUB_USER}/${repoName}/languages`;
    }
}
