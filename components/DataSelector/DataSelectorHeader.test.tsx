import { render } from '../../utils/test-utils';
import { describe, it, expect } from 'vitest';
import DataSelectorHeader from './DataSelectorHeader';
import '@testing-library/jest-dom';

describe('DataSelectorHeader', () => {
  it('renders Data Type label', () => {
    const { getByText } = render(<DataSelectorHeader />);
    expect(getByText('Data Type')).toBeInTheDocument();
  });

  it('renders Field Name label', () => {
    const { getByText } = render(<DataSelectorHeader />);
    expect(getByText('Field Name')).toBeInTheDocument();
  });

  it('renders component without crashing', () => {
    const { container } = render(<DataSelectorHeader />);
    expect(container).toBeInTheDocument();
  });
});

