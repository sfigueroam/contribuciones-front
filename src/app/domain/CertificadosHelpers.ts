import {Propiedad} from './Propiedad';
import {FormControl} from '@angular/forms';
import {Rol} from './Rol';

export class ControlHelper {
  rol: Rol;
  control: FormControl;
  icon: string;

  public constructor(init?: Partial<ControlHelper>) {
    Object.assign(this, init);
  }
}

export class Helper {
  propiedad: Propiedad;
  controls: ControlHelper[];
  selected: boolean;
  icon: string;

  public constructor(init?: Partial<Helper>) {
    Object.assign(this, init);
    this.icon = 'check_box';
  }
}
