import {FormGroup, ValidationErrors} from '@angular/forms';

export class PitValidators {

  static atLeastOneChecked(controlNames: string[]): (group: FormGroup) => ValidationErrors | null {
    return (group: FormGroup) => {
      if (controlNames && controlNames.length > 0 && controlNames.some(
        name => group.controls[name].value
      )) {
        return null;
      } else {
        return {noneChecked: true};
      }
    };
  }

  static dependency(dependsOnName: string, dependentName: string): (group: FormGroup) => ValidationErrors | null {
    return (group: FormGroup) => {
      if (group.controls[dependsOnName].value && !group.controls[dependentName].value) {
        return {dependencyFail: true};
      } else {
        return null;
      }
    };
  }
}
