import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "../shared/model/message/message.model";
import {MessageService} from "../shared/service/message.service";
import {AlertService} from "../shared/service/alert.service";
import {AlertType} from "../shared/model/alert/alert.model";
import {ValidateNotEmptyValidator} from "../shared/validators/validate-not-empty.validator";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    messageForm!: FormGroup

    constructor(
        private messageService: MessageService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.messageForm = new FormGroup({
            subject: new FormControl(null,[
                Validators.required,
                ValidateNotEmptyValidator,
            ]),
            message: new FormControl(null,[
                Validators.required,
                ValidateNotEmptyValidator,
            ]),
        })
    }

    sendMessage() {
        if (this.messageForm.invalid) {
            this.alertService.sendAlert({
                type: AlertType.WARNING,
                title: 'Warning',
                message: 'Please fill in all fields before sending a message.'
            });
            return;
        }

        let message: Message = {
            subject: this.messageForm.get('subject')?.value,
            message: this.messageForm.get('message')?.value,
            timestamp: new Date().getTime(),
        }

        this.messageService.sendMessage(message).subscribe((response) => {
            let alert;
            switch (response.status) {
            case "200 OK":
                alert = {
                    type: AlertType.SUCCESS,
                    title: 'Message sent',
                    message: response.message
                }
                break;
            default:
                alert = {
                    type: AlertType.ERROR,
                    title: 'Error',
                    message: response.message
                }
                break;
            }

            this.alertService.sendAlert(alert);
        });
    }
}
