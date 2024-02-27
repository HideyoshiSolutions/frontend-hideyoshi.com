import { Injectable } from '@angular/core';
import {Alert} from "../model/alert/alert.model";
import {Subject} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private toast: NgToastService) { }

    sendAlert(alert: Alert) {
        let content = {
            detail: alert.title,
            summary: alert.message,
            sticky: true,
            durability: '5000',
        }
        switch (alert.type) {
        case 'success':
            this.toast.success({...content, position: 'topRight'});
            break;
        case 'error':
            this.toast.error({...content, position: 'topRight'});
            break;
        case 'warning':
            this.toast.warning({...content, position: 'topRight'});
            break;
        case 'info':
            this.toast.info({...content, position: 'topRight'});
            break;
        }
    }
}
