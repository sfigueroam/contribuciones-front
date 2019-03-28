import {Component, OnInit} from '@angular/core';
import {MdlDialogReference} from '@angular-mdl/core';
import {Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent} from 'ngx-lightbox';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ayuda-rol',
  templateUrl: './ayuda-rol.component.html',
  styleUrls: ['./ayuda-rol.component.scss']
})
export class AyudaRolComponent implements OnInit {

  private albums = [];
  private subscription: Subscription;

  constructor(
    private dialog: MdlDialogReference,
    private lightbox: Lightbox,
    private lightboxEvent: LightboxEvent,
    private lighboxConfig: LightboxConfig
  ) {

    for (let i = 1; i <= 3; i++) {
      const src = 'assets/ayuda/ayudarol' + i + '.png';
      const caption = 'Ayuda Rol';
      const thumb = 'assets/ayuda/ayudarol-thumb' + i + '.png';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this.albums.push(album);
    }
    this.lighboxConfig.fadeDuration = 1;
  }

  ngOnInit() {
  }

  open(index: number): void {
    console.log(index);
    // register your subscription and callback whe open lightbox is fired
    this.subscription = this.lightboxEvent.lightboxEvent$
      .subscribe(event => this._onReceivedEvent(event));
    this.lightbox.open(this.albums, index, {wrapAround: true, showImageNumberLabel: true});
    this.volver();

  }

  private _onReceivedEvent(event: any): void {
    // remember to unsubscribe the event when lightbox is closed
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      // event CLOSED is fired
      this.subscription.unsubscribe();
    }
  }


  volver(): void {
    this.dialog.hide();
  }


}
