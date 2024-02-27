import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable, retry, retryWhen} from 'rxjs';
import {AuthService} from "../service/auth.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class RetryOnUnauthorizedInterceptor implements HttpInterceptor {

    private RETRY_COUNT = 2;

    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retry(this.RETRY_COUNT),
            catchError((error) => {
                if (error.status === 401) {
                    this.authService.refresh();
                }
                throw error;
            })
        );
    }
}
