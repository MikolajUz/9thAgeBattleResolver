import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ArmyListComponent } from './army/armyList/armyList.component';
import { UnitComponent } from './army/unit/unit.component';
import { MaterialModule } from './material/material.module';
import { RootStoreModule } from './root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GetRoosterComponent } from './army/get-rooster/get-rooster.component';
import { MainPageComponent } from './UI/main-page/main-page.component';
import { BattlefieldComponent } from './UI/battlefield/battlefield.component';

import { AngularDraggableModule } from 'angular2-draggable';
import { UnitUITopComponent } from './UI/unit-ui/unit-ui-top/unit-ui-top.component';
import { UnitDirective } from './UI/unit-ui/unit.directive';
import { UnitUiBottomComponent } from './UI/unit-ui/unit-ui-bottom/unit-ui-bottom.component';

@NgModule({
  declarations: [
    AppComponent,
    ArmyListComponent,
    UnitComponent,
    GetRoosterComponent,
    MainPageComponent,
    BattlefieldComponent,
    UnitUITopComponent,
    UnitDirective,
    UnitUiBottomComponent,
  ],
  imports: [
    BrowserModule,
    AngularDraggableModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    RootStoreModule,
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
