import { render } from '@testing-library/react';
import { Patients } from './Patients';
import * as Dialog from '@radix-ui/react-dialog';
import { vi } from 'vitest';

describe('PatientModal', () => {
  it('should render a form', () => {
    const setSelectedPatient = vi.fn()

    const { getByTestId } = render(
      <Dialog.Root>
        <Patients setSelectedPatient={setSelectedPatient} />
      </Dialog.Root>
    );
    
    expect(getByTestId('list')).toBeDefined()
  });
});