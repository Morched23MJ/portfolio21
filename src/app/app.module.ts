import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroComponent } from './pages/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExtfooterComponent } from './components/extfooter/extfooter.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { JourneyComponent } from './components/journey/journey.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DelayService } from './interceptors/delay.service';
import { ProjectsComponent } from './pages/projects/projects.component';
import { KravmagaComponent } from './pages/casestudies/kravmaga/kravmaga.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    ExtfooterComponent,
    FeaturedComponent,
    ExpertiseComponent,
    JourneyComponent,
    ProjectsComponent,
    KravmagaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: DelayService, multi: true }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
