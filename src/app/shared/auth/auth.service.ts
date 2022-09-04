import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpError } from '../model/httpError/httpError.model';
import { Token } from '../model/token/token.model';
import { User } from '../model/user/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userAuthenticated!: User;

    authSubject = new Subject<User|HttpError|null>();

    readonly BACKEND_PATH = environment.backendPath;

    constructor(private http: HttpClient) { }

    login(userAuthAtempt: User): void {
        this.validateUser(this.loginUser(userAuthAtempt));
    }

    signup(userAuthAtempt: User): void {
        this.validateUser(this.createUser(userAuthAtempt));
            
    }

    autoLogin(): void {
        this.validateUser(this.validateSession());
    }

    logout() {
        this.authSubject.next(null);
        this.destroySessions().subscribe()
    }

    async getUserAccessToken(): Promise<Token | undefined> {
        if (this.userAuthenticated) {
            if ((!this.userAuthenticated.accessToken && this.refreshAccessToken  ) || 
            (this.userAuthenticated.accessToken && this.userAuthenticated.accessToken.expirationDate < Date.now())) {
                this.userAuthenticated = <User>(await this.refreshAccessToken());
            }
            return this.userAuthenticated.accessToken;
        } else return
    }

    private loginUser(userAuthAtempt: User): Observable<User|any> {

        let loginParams = new URLSearchParams();
        loginParams.set("username", userAuthAtempt.username!);
        loginParams.set("password", userAuthAtempt.password!);

        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post<User>(
            this.BACKEND_PATH + "/user/login",
            loginParams,
            { headers: headers, withCredentials: true }
        ).pipe(
            first()
        )
    }

    private createUser(newUser: User) {
        return this.http.post<User>(
            this.BACKEND_PATH + "/user/signup",
            newUser,
            { withCredentials: true }
        ).pipe(
            first()
        )
    }

    private validateUser(userAuthAtempt: Observable<User>) {
        userAuthAtempt.subscribe({
            next: userAuthentication => {
                this.userAuthenticated = <User>userAuthentication;
                this.authSubject.next(this.userAuthenticated);
            },
            error: err => {
                this.authSubject.next(<HttpError>err.error);
            }
        });
    }

    private refreshAccessToken() {
        return firstValueFrom(this.http.post(
            this.BACKEND_PATH + "/user/login/refresh",
            this.userAuthenticated.refreshToken,
            { withCredentials: true }
        ));
    }

    private validateSession(): Observable<User> {
        return this.http.get<User>(
            this.BACKEND_PATH + '/session/validate',
            { withCredentials: true }
        ).pipe(
            first()
        );
    }

    private destroySessions() {
        return this.http.post(
            this.BACKEND_PATH + '/session/destroy',
            {},
            { withCredentials: true }
        ).pipe(
            take(1)
        );
    }
  
}
