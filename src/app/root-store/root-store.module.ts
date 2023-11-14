import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyListStoreModule } from '../army/army-store/army.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CurrentRoosterStoreModule } from '../players/current-rooster-store/current-rooster-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArmyListStoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(),
    CurrentRoosterStoreModule,
  ],
})
export class RootStoreModule {}
