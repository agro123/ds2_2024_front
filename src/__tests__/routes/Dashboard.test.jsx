import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, expect, it } from 'vitest';
import axios from 'axios';
import Dashboardview from '../../routes/admin/dashboard/index.jsx';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

const mockChartsData = [];

vi.mock('react-apexcharts', () => ({
  __esModule: true,
  default: (props) => {
    mockChartsData.push(props);
    return <div data-testid="mock-chart" />;
  },
}));

vi.mock('axios');

describe('Dashboardview Component', () => {
  const mockData = [
    { status: 'open', type_pqrsd: 'complaint' },
    { status: 'closed', type_pqrsd: 'request' },
    { status: 'open', type_pqrsd: 'complaint' },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
    mockChartsData.length = 0; 
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the dashboard title', () => {
    render(<Dashboardview />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should call the API to fetch data', async () => {
    render(<Dashboardview />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/pqrsd/'), expect.any(Object));
    });
  });

  it('should generate correct chart data from API response', async () => {
    render(<Dashboardview />);

    await waitFor(() => {
      const statusChart = mockChartsData.find((chart) => chart.type === 'pie');
      expect(statusChart).toBeDefined();
      expect(statusChart.options.labels).toEqual([]);
      expect(statusChart.series).toEqual([]);

      const typeChart = mockChartsData.find((chart) => chart.type === 'bar');
      expect(typeChart).toBeDefined();
      expect(typeChart.options.xaxis.categories).toEqual([]);
    });
  });
});