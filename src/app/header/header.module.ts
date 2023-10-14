import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header.component';
import { HeaderSliderComponent } from './header-slider/header-slider.component';
import { NavSliderComponent } from './header-slider/nav-slider/nav-slider.component';
import { UserSliderComponent } from './header-slider/user-slider/user-slider.component';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { SharedModule } from '../shared/shared.module';
import { AppRouterModule } from '../app-router.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './header-popup/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './header-popup/signup/signup.component';
import { CallbackComponent } from './header-popup/callback/callback.component';
import { MatIconModule } from '@angular/material/icon';
import { ErrorBoxComponent } from './header-popup/error-box/error-box.component';
import { HelpComponent } from './header-popup/help/help.component';
import { MyProfileComponent } from './header-popup/my-profile/my-profile.component';
import { ProfilePicturePickerComponent } from './header-popup/my-profile/profile-picture-picker/profile-picture-picker.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HeaderSliderComponent,
        NavSliderComponent,
        UserSliderComponent,
        HeaderDropdownComponent,
        LoginComponent,
        SignupComponent,
        CallbackComponent,
        ErrorBoxComponent,
        HelpComponent,
        MyProfileComponent,
        ProfilePicturePickerComponent,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        AppRouterModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        SharedModule,
        NgOptimizedImage,
    ],
    exports: [
        HeaderComponent,
        HeaderSliderComponent,
        NavSliderComponent,
        UserSliderComponent,
    ],
})
export class HeaderModule {}
