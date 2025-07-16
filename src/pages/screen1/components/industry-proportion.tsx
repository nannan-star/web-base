import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

import { fitChartSize } from '@/utils/common';
import styles from '../index.scss';

export default function HistoryUsers() {
  const historyChartRef = useRef(null);
  const historyChartInstance = useRef<echarts.ECharts | null>(null);
  const [chartData, setChartData] = useState({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getData = async () => {
    setChartData({
      '1': 100,
      '2': 200,
      '3': 300,
      '4': 400,
      '5': 500,
    });
  };

  // 渲染图表
  const renderChart = (chartInstance: echarts.ECharts, chartData: any) => {
    let options = {
      grid: {
        top: 35,
        left: 20,
        right: 20,
        bottom: 10,
        containLabel: true,
      },
      toolbox: {
        show: true,
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: '#2a3853',
              width: 2,
            },
          },
          axisTick: {
            show: false,
          },
          data: Object.keys(chartData),
          axisLabel: {
            color: 'rgba(255,255,255,.65)', //坐标的字体颜色
            fontSize: fitChartSize(12),
          },
        },
      ],
      yAxis: [
        {
          min: 0,
          type: 'value',
          splitLine: {
            show: false, // 是否显示分隔线。默认数值轴显示，类目轴不显示
            lineStyle: {
              type: 'dashed',
              color: 'rgba(208,222,238,0.20)',
              width: 1, // 设置分割线的粗细为2
            },
          },
          nameTextStyle: {
            color: 'rgba(216,240,255,0.6)',
            fontSize: fitChartSize(10),
          },
          axisLabel: {
            formatter: '{value}',
            color: 'rgba(216,240,255,0.6)',
            fontSize: fitChartSize(10),
          },
        },
      ],
      series: [
        {
          tooltip: {
            show: false,
          },
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: 'rgba(0,88,255,0.2)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0,147,221,1)', // 100% 处的颜色
                },
              ],
              false,
            ),
          },
          data: Object.values(chartData),
          barGap: 0,
        },
        {
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: 'rgba(1,56,222,0.2)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0,107,188,1)', // 100% 处的颜色
                },
              ],
              false,
            ),
          },
          barGap: 0,
          data: Object.values(chartData),
          label: {
            show: true,
            position: [-10, -22],
            color: '#fff',
            fontSize: fitChartSize(14),
            fontFamily: 'YouSheBiaoTiHei',
          },
        },
        {
          type: 'pictorialBar',
          symbol: 'diamond',
          // barMaxWidth: '20',
          symbolSize: [21, 12],
          symbolOffset: [0, -6],
          symbolPosition: 'end',
          zlevel: 2,
          itemStyle: {
            color: '#2D9AE9', // 顶部方块的颜色
          },
          data: Object.values(chartData),
        },
      ],
    };
    if (options && typeof options === 'object') {
      chartInstance.setOption(options);
    }
  };

  const updateChartData = (chartInstance: echarts.ECharts, chartData: any) => {
    const updatedOptions = {
      xAxis: [
        {
          data: Object.keys(chartData),
        },
      ],
      series: [
        {
          data: Object.values(chartData),
        },
        {
          data: Object.values(chartData),
        },
        {
          data: Object.values(chartData),
        },
      ],
    };

    chartInstance.setOption(updatedOptions, {
      notMerge: false,
      lazyUpdate: true,
      silent: false,
    });
  };

  useEffect(() => {
    getData();
    timerRef.current = setInterval(getData, 10000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    historyChartInstance.current = echarts.init(historyChartRef.current);

    renderChart(historyChartInstance.current, chartData);

    const handleResize = () => {
      historyChartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (historyChartInstance.current) {
        historyChartInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (Object.keys(chartData).length === 0 || !historyChartInstance.current) return;
    // 更新图表数据
    updateChartData(historyChartInstance.current, chartData);
  }, [chartData]);

  return <div ref={historyChartRef} className={styles['industry-proportion']}></div>;
}
