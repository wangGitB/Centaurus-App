import { FC, useState, useEffect, useRef } from "react";
import * as echarts from 'echarts';

// 定义数据类型
type DataType = [number, number, number | string];

const HeatMap: FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<DataType[]>([]);  // 显式指定类型为 DataType 数组
    const [hours, setHours] = useState<string[]>([]);
    const [days, setDays] = useState<string[]>([]);
    const myChartRef = useRef<echarts.EChartsType | null>(null); // 使用 useRef 来存储图表实例

    useEffect(() => {
        // 模拟接口请求
        setTimeout(() => {
            const arr: DataType[] = [
                [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0],
                [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2],
                [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6],
                [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5],
                [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0],
                // ... 省略其他数据
            ].map(item => [item[1], item[0], item[2] || '-']);
            
            const hourArr = [
                '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                '7a', '8a', '9a', '10a', '11a',
                '12p', '1p', '2p', '3p', '4p', '5p',
                '6p', '7p', '8p', '9p', '10p', '11p'
            ];
            
            const dayArr = [
                'Saturday', 'Friday', 'Thursday',
                'Wednesday', 'Tuesday', 'Monday', 'Sunday'
            ];
            
            // 设置数据
            setData(arr);
            setHours(hourArr);
            setDays(dayArr);
        }, 1000);
    }, []);

    useEffect(() => {
        // 初始化图表实例
        if (chartRef.current && !myChartRef.current) {
            myChartRef.current = echarts.init(chartRef.current);
        }

        // 当数据、小时、星期加载完后初始化热力图
        if (data.length > 0 && hours.length > 0 && days.length > 0 && myChartRef.current) {
            const myChart = myChartRef.current;
            const option = {
                tooltip: {
                    position: 'top'
                },
                grid: {
                    height: '90%',
                    top: '0%',
                    bottom: '10%',
                    left: '5%',
                    right: '.6%'
                },
                xAxis: {
                    type: 'category',
                    data: hours,
                    show: false,  // 隐藏 x 轴
                    splitArea: {
                        show: true  // 保持背景网格显示
                    }
                },
                yAxis: {
                    type: 'category',
                    data: days,
                    show: false,  // 隐藏 y 轴
                    splitArea: {
                        show: true  // 保持背景网格显示
                    }
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    show: false,
                },
                series: [
                    {
                        name: 'Punch Card',
                        type: 'heatmap',
                        data: data,
                        label: {
                            show: true
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            // 设置图表配置项
            myChart.setOption(option);
        }

        // 清理函数：组件卸载时销毁图表实例
        return () => {
            if (myChartRef.current) {
                myChartRef.current.dispose();
                myChartRef.current = null;
            }
        };
    }, [data, hours, days]);  // 依赖于 data, hours 和 days，当它们变化时重新渲染图表

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div ref={chartRef} className="heat-map" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default HeatMap;
