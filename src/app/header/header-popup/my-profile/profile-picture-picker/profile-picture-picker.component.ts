import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../../shared/service/auth.service';

@Component({
    selector: 'app-profile-picture-picker',
    templateUrl: './profile-picture-picker.component.html',
    styleUrls: ['./profile-picture-picker.component.css'],
})
export class ProfilePicturePickerComponent {
    @Output()
        imageSent = new EventEmitter<boolean>();

    private profilePicture!: File;

    constructor(private authService: AuthService) {}

    handleFileInput(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        const fileList: FileList | null = element.files;
        if (fileList != null && fileList.length > 0 && fileList[0] != null) {
            this.profilePicture = fileList[0];
        }
    }

    uploadProfilePicture() {
        this.authService.addProfilePicture(this.profilePicture);
        this.imageSent.emit(true);
    }

    getFileName(): string {
        return this.profilePicture.name;
    }

    get isProfilePictureSelected(): boolean {
        return !!this.profilePicture;
    }
}
