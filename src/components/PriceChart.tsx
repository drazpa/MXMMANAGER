import React, { useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { TimeRange } from '../types/types';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../utils/reserveCalculations';
import { Calendar, TrendingUp } from 'lucide-react';
import { getPriceHistory } from '../data/mockData';

interface PriceChartProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  data: Array<{
    timestamp: string;
    price: number;
    volume: number;
  }>;
}

export const PriceChart: React.FC<PriceChartProps> = ({ 
  timeRange, 
  onTimeRangeChange
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredData, setHoveredData] = useState<{
    price: number;
    timestamp: string;
  } | null>(null);

  const timeRanges: TimeRange[] = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];
  const data = getPriceHistory(timeRange);

  const handleMouseMove = useCallback((props: any) => {
    if (props.activePayload) {
      setHoveredData({
        price: props.activePayload[0].value,
        timestamp: props.activePayload[0].payload.timestamp,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredData(null);
  }, []);

  const currentPrice = data[data.length - 1]?.price || 0;
  const startPrice = data[0]?.price || 0;
  const priceChange = ((currentPrice - startPrice) / startPrice) * 100;

  return (
    <div className="card-border-gradient shadow-glow-light dark:shadow-glow-dark mb-8">
      <div className="card-content">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">MXM Price History</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(hoveredData?.price || currentPrice)}
                </span>
                <span className={`flex items-center text-sm ${
                  priceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
              {hoveredData && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(hoveredData.timestamp).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    timeRange === range
                      ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={data} 
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? '#4ade80' : '#16a34a'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isDark ? '#4ade80' : '#16a34a'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="timestamp" 
                  stroke={isDark ? '#9ca3af' : '#64748b'}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    if (timeRange === '1D') {
                      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    }
                    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                  }}
                />
                <YAxis 
                  stroke={isDark ? '#9ca3af' : '#64748b'}
                  tickFormatter={(value) => formatCurrency(value)}
                  domain={['dataMin', 'dataMax']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    borderColor: isDark ? '#374151' : '#e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Price']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isDark ? '#4ade80' : '#16a34a'}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  animationDuration={500}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: isDark ? '#4ade80' : '#16a34a',
                    stroke: isDark ? '#1f2937' : '#ffffff',
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};