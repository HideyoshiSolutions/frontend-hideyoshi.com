import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UpdateService {
    constructor(private swUpdate: SwUpdate) {
        if (swUpdate.isEnabled) {
            interval(6 * 60 * 60).subscribe(() =>
                swUpdate
                    .checkForUpdate()
                    .then(() => console.log('checking for updates')),
            );
        }
    }

    public checkForUpdates(): void {
        this.swUpdate.versionUpdates.subscribe(versionUpdate => {
            if (versionUpdate.type === 'VERSION_READY') {
                this.promptUser();
            }
        })
    }

    private promptUser(): void {
        console.log('updating to new version');
        this.swUpdate.activateUpdate().then(() => document.location.reload());
    }
}
