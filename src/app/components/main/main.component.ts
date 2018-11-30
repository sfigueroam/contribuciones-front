import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  tabChanged(event: { index: number }) {
    console.log(event);
    if (event.index === 0) {
      this.router.navigate(['/main/contribuciones/seleccionar-cuotas']);
    } else if (event.index === 1) {
      this.router.navigate(['/main/contribuciones/certificados']);
    }
  }
}
