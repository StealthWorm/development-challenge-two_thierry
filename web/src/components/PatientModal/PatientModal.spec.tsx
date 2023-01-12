import { render } from '@testing-library/react';
import { PatientModal } from './PatientModal';
import * as Dialog from '@radix-ui/react-dialog';

describe('PatientModal', () => {
  it('should render a form', () => {
    const { getByTestId } = render(
      <Dialog.Root>
        <PatientModal currentPatientId={''} />
      </Dialog.Root>
    );
    expect(getByTestId('form')).toBeDefined()
    expect(getByTestId('form')).toBeTruthy();
  });
});