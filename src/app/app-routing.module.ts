import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'products', loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  // { path: '**', component: PageNotFoundComponent, data: { title: '' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
