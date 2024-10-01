import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskReducer } from './core/store/reducers/task.reducer';
import { TaskEffects } from './core/store/effects/task.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { notificationEffects } from './core/store/common/alert/notification.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([TaskEffects, notificationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forRoot({ task: TaskReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
