import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    JourneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
