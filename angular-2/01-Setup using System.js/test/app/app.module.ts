import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HelloWorldComponent} from './helloworld.component';

@NgModule({
	imports: [BrowserModule],
	declarations: [HelloWorldComponent],
	bootstrap: [HelloWorldComponent]
})
export class AppModule{ }