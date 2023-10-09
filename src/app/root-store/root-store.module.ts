import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArmyListStoreModule } from './army-list-store/army-list.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArmyListStoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(),
  ],
})
export class RootStoreModule {}
