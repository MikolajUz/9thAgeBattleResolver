import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { currentRoosterFeatureKey, currentRoosterReducer } from './current-rooster.reducer';
import { currentRoosterStoreEffects } from './current-rooster.effects';


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
