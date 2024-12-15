import React, { useState, useCallback } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../utils/reserveCalculations';
import { TimeRange, ChartDataPoint } from '../../types/types';
import { TimeRangeSelector } from '../TimeRangeSelector';
import { formatChartDate, generateTimeSeriesData } from '../../utils/chartUtils';

interface WalletHistoricalValueProps {
  initialValue: number;
}

export const WalletHistoricalValue: React.FC<WalletHistoricalValueProps> = ({ initialValue }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [hoveredData, setHoveredData] = useState<ChartDataPoint | null>(null);

  const data = generateTimeSeriesData(timeRange, initialValue);

  const handleMouseMove = useCallback((props: any) => {
    if (props.activePayload) {
      setHoveredData(props.activePayload[0].payload);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredData(null);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Value History</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {formatCurrency(hoveredData?.value || data[data.length - 1].value)}
          </p>
          {hoveredData && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(hoveredData.timestamp).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: timeRange === '1D' ? '2-digit' : undefined,
                minute: timeRange === '1D' ? '2-digit' : undefined
              })}
            </p>
          )}
        </div>
        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />
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
              <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? '#4ade80' : '#16a34a'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isDark ? '#4ade80' : '#16a34a'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => formatChartDate(value, timeRange)}
              stroke={isDark ? '#9ca3af' : '#64748b'}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              stroke={isDark ? '#9ca3af' : '#64748b'}
              domain={['dataMin', 'dataMax']}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(data.timestamp).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: timeRange === '1D' ? '2-digit' : undefined,
                        minute: timeRange === '1D' ? '2-digit' : undefined
                      })}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(data.value)}
                    </p>
                    {data.volume && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Volume: {formatCurrency(data.volume)}
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isDark ? '#4ade80' : '#16a34a'}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#valueGradient)"
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
  );
};