/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { expect, describe, test } from "vitest";
import Clock from './Clock'
import { Header } from './Header'

describe('Header', () => {
  test('should render the correct text and clock component', () => {
    render(<Header />)

    // Check if the text is rendered correctly
    expect(screen.getByText(/Gerenciamento de Pacientes/i)).to.exist

    // Check if the Clock component is rendered
    expect(screen.getByTestId('clock')).to.exist
  })
})


