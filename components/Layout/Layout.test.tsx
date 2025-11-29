import { render } from '../../utils/test-utils';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';
import '@testing-library/jest-dom';

describe('Layout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    const { container } = render(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    
    const contentDiv = container.querySelector('[class*="content"]');
    expect(contentDiv).toBeInTheDocument();
  });
});
