import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from '../app/demo/components/auth/login/shared/auth.guard';
@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', data: { breadcrumb: 'List' }, loadChildren: () => import('./demo/components/uikit/list/listdemo.module').then(m => m.ListDemoModule) },
            {
                path: 'painel', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/uikit/list/listdemo.module').then(m => m.ListDemoModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ],
                // canActivate: [AuthGuard]
            },
            { path: 'login', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'register', loadChildren: () => import('./demo/components/auth/register/register.module').then(m => m.RegisterModule) },


        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
