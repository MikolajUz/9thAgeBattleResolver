import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  currentRoosterFeatureKey,
  currentRoosterReducer,
} from './rooster.reducer';
import { currentRoosterStoreEffects } from './rooster.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(currentRoosterFeatureKey, currentRoosterReducer),
    EffectsModule.forFeature([currentRoosterStoreEffects]),
  ],
  providers: [currentRoosterStoreEffects],
})
export class CurrentRoosterStoreModule {}
