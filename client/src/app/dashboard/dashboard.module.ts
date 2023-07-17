import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SetsComponent } from '../sets/sets.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { SetComponent } from '../set/set.component';
import { CardsComponent } from '../cards/cards.component';
import { CardComponent } from '../card/card.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AdminComponent } from '../admin/admin.component';
import { QuickMoveComponent } from '../shared/quick-move/quick-move.component';
import { SortTabsComponent } from '../shared/sort-tabs/sort-tabs.component';
import { BinderModifyComponent } from '../set/binder-modify/binder-modify.component';
import { TopCardComponent } from './top-card/top-card.component';
import { ProgressListComponent } from './progress-list/progress-list.component';
import { UploadImageComponent } from '../dialog/upload-image/upload-image.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SingleCardComponent } from '../shared/single-card/single-card.component';
import { SetDataComponent } from '../set/set-data/set-data.component';
import { ResultsComponent } from '../search/results/results.component';
import { ResultsMobileComponent } from '../search/results-mobile/results-mobile.component';
import { SearchFormComponent } from '../search/search-form/search-form.component';
import { Badge } from '../shared/directives/badge.directive';

@NgModule({
    declarations: [
        SetsComponent,
        DashboardComponent,
        SetComponent,
        CardsComponent,
        CardComponent,
        SearchComponent,
        ProfileComponent,
        ChangePasswordComponent,
        AdminComponent,
        QuickMoveComponent,
        SortTabsComponent,
        BinderModifyComponent,
        TopCardComponent,
        ProgressListComponent,
        UploadImageComponent,
        MainNavigationComponent,
        SingleCardComponent,
        SetDataComponent,
        ResultsComponent,
        ResultsMobileComponent,
        SearchFormComponent,
        Badge,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
            extend: true,
        }),
    ],
})
export class DashboardModule {}

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
