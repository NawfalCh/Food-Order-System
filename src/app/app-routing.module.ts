import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestellungComponent } from './components/bestellung/bestellung.component';
import { HomeComponent } from './components/home/home.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bestellung', component: BestellungComponent },
  { path: 'my-order', component: MyOrderComponent },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
