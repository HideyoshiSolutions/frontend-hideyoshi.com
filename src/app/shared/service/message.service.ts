import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {environment} from "../../../environments/environment.prod";
import {Message} from "../model/message/message.model";
import {HttpClient} from "@angular/common/http";
import {Value} from "@sinclair/typebox/value";
import {User} from "../model/user/user.model";
import {MessageResponse} from "../model/message/messageResponse.model";
import {catchError} from "rxjs/operators";
import {Alert, AlertType} from "../model/alert/alert.model";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private authenticatedUser!: User;

    MESSAGE_API_URL = environment.messageApiPath;

    constructor(private authService: AuthService, private http: HttpClient) {
        this.authService.authSubject.subscribe((user) => {
            if (Value.Check(User, user)) {
                this.authenticatedUser = user;
            }
        });
    }

    sendMessage(message: Message) {
        if (!this.authenticatedUser || !this.authenticatedUser.accessToken?.token) {
            throw new Error('User is not authenticated');
        }

        return this.http.post<MessageResponse>(this.MESSAGE_API_URL + '/message', message, {
            headers: {
                'Authorization': 'Bearer ' + this.authenticatedUser.accessToken.token,
            }
        }).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    return of(<MessageResponse>{
                        status: '401 Unauthorized',
                        message: (
                            'You are not authorized to send messages.' +
                            'Please log in and try again'
                        ),
                    })
                }
                return of(<MessageResponse>{
                    status: '500 Internal Server Error',
                    message: 'An error occurred while sending the message',
                })
            })
        )
    }
}
