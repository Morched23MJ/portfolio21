import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelayGuard } from './guards/delay.guard';
import { AboutComponent } from './pages/about/about.component';
import { KravmagaComponent } from './pages/casestudies/kravmaga/kravmaga.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeroComponent } from './pages/hero/hero.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  {
    path: "",
    component: HeroComponent,
    canActivate: [DelayGuard],
    data: { animation: 'HomePage' }
  },
  {
    path: "about",
    component: AboutComponent,
    canActivate: [DelayGuard],
    data: { animation: 'AboutPage' }
  },
  {
    path: "projects",
    children: [
      {
        path: '',
        canActivate: [DelayGuard],
        component: ProjectsComponent
      },
      {
        path: 'kravmaga',
        canActivate: [DelayGuard],
        component: KravmagaComponent
      }
    ]
  },
  {
    path: "kravmaga",
    component: ProjectsComponent,
    canActivate: [DelayGuard],
    data: { animation: 'ProjectsPage' }
  },
  {
    path: "contact",
    component: ContactComponent,
    canActivate: [DelayGuard],
    data: { animation: 'ContactPage' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
