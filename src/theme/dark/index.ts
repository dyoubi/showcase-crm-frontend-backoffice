import { produce } from 'immer';

import { palette } from '../palette';
import { light } from '../light';

export const dark = produce(light, (state) => {
  state.typography.colors.primary = '#D6D6D6';
  state.typography.colors.secondary = palette.gray['60'];

  state.components.body.backgroundColor = palette.dark['100'];
  state.components.containers.backgroundColor = palette.dark['80'];
  state.components.formGroup.border.default = '#35477A';
  state.components.formGroup.border.disabled = '#444A5B';
  state.components.formGroup.header = '#444A5B';
  state.components.formGroup.title = '#D6D6D6';
  state.components.formGroup.label = '#A5B2D6';
  state.components.formGroup.value = '#FFFFFF';
  state.components.formGroup.input.height = 30;
  state.components.formGroup.input.width = 170;
});
