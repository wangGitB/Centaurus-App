import { FC, useState, useEffect, useRef } from "react";
import * as echarts from 'echarts';
import output from './output.json'

// 定义数据类型
type DataType = [number, number, number | string];

const HeatMap: FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<DataType[]>([]);  // 显式指定类型为 DataType 数组
    const [hours, setHours] = useState<string[]>([]);  // 用于存储时间戳的 x 轴数据
    const [days, setDays] = useState<number[]>([]);  // 用于存储 y 轴数据（天数）
    const myChartRef = useRef<echarts.EChartsType | null>(null); // 使用 useRef 来存储图表实例

    // 对数转换函数
    function logTransform(value: number) {
        return value > 0 ? Math.log(value) : 0; // 对数转换，避免负无穷
    }

    // 格式化数据为 ECharts 热力图格式
    function formatHeatmapData(rawData: any[]) {
        // 提取时间戳数据（这里假设 rawData 是有 timestamp 字段的）
        const xAxisData = rawData.map(item => item.timestamp); // 作为 x 轴的时间戳数据

        // 转换 pmf 数组为热力图数据格式
        const heatmapData = rawData.flatMap((item, timestampIndex) => {
            return item.pmf
                .map((value, pmfIndex) => {
                    // 过滤掉无效数据 (如 '-')
                    if (value === 0) {
                        return null;
                    }
                    return [timestampIndex, pmfIndex, logTransform(value)]; // 返回热力图数据格式：[x, y, value]
                })
                .filter(item => item !== null) as [number, number, number][]; // 过滤掉 null 值
        });

        return { heatmapData, xAxisData };
    }

    // 模拟接口获取数据
    const getData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(output); // 返回模拟的数据
            }, 1000);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const rawData = await getData() as any[]; // 获取模拟数据
            if (rawData) {
                const { heatmapData, xAxisData } = formatHeatmapData(rawData); // 格式化数据为 ECharts 热力图格式
                // 获取 y 轴数据（索引值范围）
                const yAxisData = [...new Set(heatmapData.map(item => item[1]))].sort((a, b) => a - b);
                console.log(heatmapData);
                
                setData(heatmapData);  // 设置热力图数据
                setHours(xAxisData);   // 设置 x 轴（时间戳数据）
                setDays(yAxisData);    // 设置 y 轴（去重的 pmf 索引数据）
            }
        };

        fetchData();
    }, []); // 模拟接口请求数据

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
                    left: '.6%',
                    right: '5%'
                },
                xAxis: {
                    type: 'category',
                    data: hours, // 使用时间戳作为 x 轴数据
                    show: false,  // 显示 x 轴
                    splitArea: {
                        show: true  // 保持背景网格显示
                    },
                },
                yAxis: {
                    type: 'category',
                    data: days,  // 使用 days 数组作为 y 轴
                    show: false,  // 隐藏 y 轴
                    inverse: true,
                    splitArea: {
                        show: true  // 保持背景网格显示
                    }
                },
                visualMap: {
                    min: -10,
                    max: 1,
                    show: false,
                     inRange: {
                        color: [
                            '#313695',
                            '#4575b4',
                            '#74add1',
                            '#abd9e9',
                            '#e0f3f8',
                            '#ffffbf',
                            '#fee090',
                            '#fdae61',
                            '#f46d43',
                            '#d73027',
                            '#a50026'
                        ]
                    }
                },
                series: [
                    {
                        name: 'Punch Card',
                        type: 'heatmap',
                        data: data,  // 使用处理后的热力图数据
                        label: {
                            show: false
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
