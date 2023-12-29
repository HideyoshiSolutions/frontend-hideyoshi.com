import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    first,
    map,
    Observable,
    of,
    Subject,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpError } from '../model/httpError/httpError.model';
import { User } from '../model/user/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userAuthenticated!: User;

    authSubject = new Subject<User | HttpError | null>();

    readonly BACKEND_PATH = environment.backendPath;

    readonly BACKEND_OAUTH_PATH = environment.backendOAuthPath;

    constructor(private http: HttpClient) {}
    login(userAuthAtempt: User): void {
        this.validateUser(this.loginUser(userAuthAtempt));
    }

    googleLogin() {
        window.open(
            this.BACKEND_OAUTH_PATH + '/oauth2/authorization/google',
            '_self',
        );
    }

    githubLogin() {
        window.open(
            this.BACKEND_OAUTH_PATH + '/oauth2/authorization/github',
            '_self',
        );
    }

    loginGoogleUser(p: any): void {
        this.validateUser(this.fetchGoogleOAuthToken(p));
    }

    loginGithubUser(p: any): void {
        this.validateUser(this.fetchGithubOAuthToken(p));
    }

    signup(userAuthAtempt: User): void {
        this.validateUser(this.createUser(userAuthAtempt));
    }

    refresh(): void {
        this.validateUser(this.refreshAccessToken());
    }

    autoLogin(): void {
        this.validateUser(this.validateSession());
    }

    logout() {
        this.authSubject.next(null);
        this.destroySessions().subscribe();
    }

    deleteAccount() {
        return this.deleteAccountRequest();
    }

    addProfilePicture(file: File): void {
        const fileType = file.type.split('/')[1];
        this.getAddProfilePictureUrl(fileType).subscribe({
            next: (url: string | null) => {
                if (url != null) {
                    this.uploadProfilePicture(url, file).then(
                        (response: Observable<any>) => {
                            response.subscribe({
                                next: (response: any) => {
                                    this.processProfilePicture().subscribe(
                                        () => {
                                            this.refresh();
                                        },
                                    );
                                },
                            });
                        },
                    );
                }
            },
        });
    }

    private loginUser(userAuthAtempt: User): Observable<User | any> {
        let loginParams = new URLSearchParams();
        loginParams.set('username', userAuthAtempt.username!);
        loginParams.set('password', userAuthAtempt.password!);

        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        return this.http
            .post<User>(this.BACKEND_PATH + '/user/login', loginParams, {
                headers: headers,
                withCredentials: true,
            })
            .pipe(first());
    }

    private fetchGoogleOAuthToken(p: any): Observable<User | any> {
        let params = new HttpParams({
            fromObject: p,
        });

        return this.http
            .get<User>(this.BACKEND_OAUTH_PATH + '/login/oauth2/code/google', {
                withCredentials: true,
                params: params,
            })
            .pipe(first());
    }

    private fetchGithubOAuthToken(p: any): Observable<User | any> {
        let params = new HttpParams({
            fromObject: p,
        });

        return this.http
            .get<User>(this.BACKEND_OAUTH_PATH + '/login/oauth2/code/github', {
                withCredentials: true,
                params: params,
            })
            .pipe(first());
    }

    private createUser(newUser: User) {
        return this.http
            .post<User>(this.BACKEND_PATH + '/user/signup', newUser, {
                withCredentials: true,
            })
            .pipe(first());
    }

    private refreshAccessToken() {
        return this.http.post<User>(
            this.BACKEND_PATH + '/user/login/refresh',
            this.userAuthenticated.refreshToken,
            { withCredentials: true },
        );
    }

    private validateSession(): Observable<User> {
        return this.http.get<User>(this.BACKEND_PATH + '/session/validate', {
            withCredentials: true,
        });
    }

    private destroySessions() {
        return this.http.delete(this.BACKEND_PATH + '/session/destroy', {
            withCredentials: true,
        });
    }

    private deleteAccountRequest() {
        let headers = this.createAuthorizationHeader();

        return this.http.delete(this.BACKEND_PATH + `/user/delete`, {
            headers: headers,
            withCredentials: true,
        });
    }

    private validateUser(userAuthAtempt: Observable<User>) {
        userAuthAtempt
            .pipe(
                catchError((error) => {
                    if (error.status == 0) {
                        return of(<HttpError>{
                            title: 'Service Unavailable',
                            status: 500,
                            details:
                                'Service Unavailable, please try again later.',
                            developerMessage:
                                'Service Unavailable, please try again later.',
                            timestamp: new Date().toISOString(),
                        });
                    }
                    return of(<HttpError>error.error);
                }),
                first(),
            )
            .subscribe({
                next: (userAuthentication) => {
                    this.userAuthenticated = <User>userAuthentication;
                    this.authSubject.next(this.userAuthenticated);
                },
            });
    }

    private getAddProfilePictureUrl(
        fileType: string,
    ): Observable<string | null> {
        return this.http
            .post<{ presigned_url: string; file_key: string }>(
                this.BACKEND_PATH +
                    '/user/profile-picture?fileType=' +
                    fileType,
                null,
                {
                    headers: this.createAuthorizationHeader(),
                    withCredentials: true,
                },
            )
            .pipe(
                first(),
                map((res) => {
                    if (!!res && !!res.presigned_url) {
                        return res.presigned_url;
                    }
                    return null;
                }),
            );
    }

    private async uploadProfilePicture(
        url: string,
        file: File,
    ): Promise<Observable<any>> {
        const fileData = await this.readAsArrayBuffer(file);
        let headers = new HttpHeaders({
            'Content-Type': file.type,
        });
        return this.http.put(url, fileData, {
            headers: headers,
        });
    }

    private processProfilePicture() {
        return this.http.post(
            this.BACKEND_PATH + '/user/profile-picture/proccess',
            null,
            {
                headers: this.createAuthorizationHeader(),
                withCredentials: true,
            },
        );
    }

    private createAuthorizationHeader(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization:
                'Bearer ' + this.userAuthenticated.accessToken?.token,
        });
    }

    private async readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        return new Promise<ArrayBuffer>((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
        });
    }
}
