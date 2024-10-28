import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BestellungComponent } from './components/bestellung/bestellung.component';
import { MenuDialogComponent } from './components/menu-bestellung/menu-dialog/menu-dialog.component';
import { BurgerKonfigDialogComponent } from './components/konfig-dialogs/burger-konfig-dialog/burger-konfig-dialog.component';
import { SandwichKonfigDialogComponent } from './components/konfig-dialogs/sandwich-konfig-dialog/sandwich-konfig-dialog.component';
import { FormsModule } from '@angular/forms';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BurgerComponent } from './components/menu-bestellung/burger/burger.component';
import { SandwichComponent } from './components/menu-bestellung/sandwich/sandwich.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestellungComponent,
    MenuDialogComponent,
    BurgerKonfigDialogComponent,
    SandwichKonfigDialogComponent,
    MyOrderComponent,
    BurgerComponent,
    SandwichComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
