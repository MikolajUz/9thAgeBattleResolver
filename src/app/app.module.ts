import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ArmyListComponent } from './army/components/containers/armyList/armyList.component';
import { UnitComponent } from './army/components/features/unit/unit.component';
import { MaterialModule } from '../UI/material/material.module';
import { RootStoreModule } from './root-store/root-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RoosterLoaderComponent } from './players/components/features/rooster-loader/rooster-loader.component';
import { MainPageComponent } from './main/components/containers/main-page/main-page.component';
import { BattlefieldComponent } from './main/components/features/battlefield/battlefield.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { UnitVisualComponent } from './players/components/features/unit-visual/unit-visual.component';
import { UnitDirective } from './players/components/features/unit.directive';
import { TableRoosterComponent } from './players/components/features/table-rooster/table-rooster.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { BattleComponent } from './main/components/features/battle/battle.component';


@NgModule({
  declarations: [
    AppComponent,
    ArmyListComponent,
    UnitComponent,
    RoosterLoaderComponent,
    MainPageComponent,
    BattlefieldComponent,
    UnitVisualComponent,
    UnitDirective,
    TableRoosterComponent,
    BattleComponent,
    
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
    AngularResizeEventModule,
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
