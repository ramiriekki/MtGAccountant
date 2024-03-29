import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { tooltipDefaults } from 'src/defaults/tooltipDefaults';
import { RouteReuseStrategy } from '@angular/router';
import { mtgRouteResuseStrategy } from './strategies/mtgRouteReuseStrategy';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    text: 'Loading...',
    textColor: '#FFFFFF',
    textPosition: 'center-center',
    bgsColor: '#7b1fa2',
    fgsColor: '#7b1fa2',
    fgsType: SPINNER.circle,
    fgsSize: 100,
    hasProgressBar: false,
};

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        FooterComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ConfirmationComponent,
        ForgotPasswordComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        HttpClientModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorInterceptor,
            multi: true,
        },
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipDefaults },
        {
            provide: RouteReuseStrategy,
            useClass: mtgRouteResuseStrategy,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
