import { FC, useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import klin from './klin.json'
import dayjs from "dayjs";

// 模拟的数据类型
type KlineData = {
  data_us: string;  // ISO 8601 格式的日期字符串
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  hold: number;
  open_interest: number | null;  // 可能为 null
  turnover: number;
  settle: number | null;  // 可能为 null
  pre_settle: number | null;  // 可能为 null
  product_id: string;
  current_us: string;  // ISO 8601 格式的日期字符串
  change: number;
  amplitude: number;
  data_ts: number;  // 时间戳
};

const Kline: FC = () => {
  const klineRef = useRef<HTMLDivElement | null>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  const [klinData, setKlinData] = useState<KlineData[]>([]);

  // 模拟接口
  const getData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(klin); // 这里模拟返回数据
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData() as KlineData[];
      data && setKlinData(data); // 将数据存储在 state 中
    };

    fetchData();  // 调用异步获取数据函数
  }, []);

  // kline图配置
  const option = {
    animation: false,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: () => "", //取消tip弹窗
    },
    visualMap: {
      show: false,
      seriesIndex: 1,
      dimension: 2,
      pieces: [
        { value: 1, color: "#296758" },
        { value: -1, color: "#762c38" },
      ],
    },
    axisPointer: {
      link: [{ xAxisIndex: "all" }],
      label: { backgroundColor: "#777" },
    },
    grid: [
      { top: "0%", left: ".6%", right: "5%", height: "75%" },
      { left: ".6%", right: "5%", top: "75.5%", height: "16%" },
    ],
    xAxis: [
      {
        type: "category",
        gridIndex: 0, // 主图（K线图）
        data: [] as string[], // x轴使用数据中的日期
        boundaryGap: true,
        axisLine: { onZero: false, lineStyle: { color: "#404552" } },
        min: "dataMin",
        max: "dataMax",
        axisTick: { show: false }, //不显示刻度
        axisLabel: {
          show: false, // 不显示主图的 x 轴刻度
        },
        axisPointer: {
          label: { show: false }, // 禁用提示框
        },
      },
      {
        type: "category",
        gridIndex: 1, // 副图（持仓柱状图）
        data: [], // x轴使用数据中的日期
        boundaryGap: true,
        axisLine: { onZero: false, lineStyle: { color: "#404552" } },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
          show: true, // 显示副图的 x 轴刻度
          color: "",
          fontSize: 12,
          formatter: (value: string) => dayjs(value).format('HH:mm'),
        },
      },
    ],
    yAxis: [
      {
        scale: true,
        axisLabel: { show: true, fontSize: 12 },
        splitLine: { show: true, lineStyle: { color: "#404552" } },
        position: "right",
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
      },
    ],
    dataZoom: [
    // 内部控制（鼠标滚轮、触摸缩放）
    { 
      type: "inside", 
      xAxisIndex: [0, 1],  // 同时作用于主图和副图
      start: 50, 
      end: 100 
    },
    // 外部控制（滑动条控制）
    { 
      type: "slider", 
      xAxisIndex: [0, 1],  // 同时作用于主图和副图
      start: 50, 
      end: 100,
      handleSize: "100%", // 设置滑动条的大小
      height: 20, // 设置滑动条的高度
      bottom: 10,  // 设置滑动条的位置
    }
  ],

    series: [] as echarts.SeriesOption[],
  };

  // 初始化和更新图表
  useEffect(() => {
    if (klineRef.current) {
      const myChart = echarts.init(klineRef.current);
      setChart(myChart);
    }
  }, []);

  // 格式化数据
  const splitData = (rawData: KlineData[]) => {
    const categoryData: string[] = [];
    const values: [number, number, number, number][] = [];
    const volumes: [number, number, number][] = [];

    rawData.forEach((item, index) => {
      // 将时间戳转换为可读格式
      const dateStr = dayjs(item.data_ts * 1000).format("YYYY-MM-DD HH:mm:ss");
      categoryData.push(dateStr);
      // 将数据转换为K线图需要的格式
      values.push([item.open, item.close, item.low, item.high]);
      // 将成交量数据转换为K线图需要的格式
      volumes.push([index, item.volume, item.close > item.open ? 1 : -1]);
    });

    return { categoryData, values, volumes, rawData };
  };

  useEffect(() => {
    if (chart && klinData.length) {
      const { categoryData, values, volumes } = splitData(klinData);
      console.log(categoryData, values, volumes);

      // 创建series数据
      const series: echarts.EChartsOption["series"] = [
        {
          type: "candlestick",
          name: "K",
          data: values,  // 用values作为K线图的数据
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            color: 'red',
            color0: 'green',
            borderColor: undefined,
            borderColor0: undefined,
          },
        },
        {
          type: "bar",
          name: "持仓量",
          data: volumes,  // 用volumes作为持仓量的数据
          xAxisIndex: 1,
          yAxisIndex: 1,
        },
      ];

      // 更新 xAxis 数据
      option.xAxis[0].data = categoryData; // 更新主图的x轴数据
      option.xAxis[1].data = categoryData; // 更新副图的x轴数据

      // 更新 series 数据
      option.series = series;

      // 侦听数据缩放事件
      chart.on("dataZoom", (params: any) => {
        params.batch?.forEach?.((zoom: any) => handleDataZoom(zoom));
      });
      // 调用 setOption 方法更新图表
      chart.setOption(option);

    }
  }, [chart, klinData]);


  // 拖拽到历史数据调接口 todo...
  const handleDataZoom = (params: any) => {
    if (Number(params.start) === 0) {
      console.log(params);
    }
  };

    // 实时数据更新方法
  const handleRealTimeData = (newData: KlineData) => {
    setKlinData((prevData) => {
      // 将新数据推入数据数组并更新图表
      const updatedData = [...prevData, newData];
      const { categoryData, values, volumes } = splitData(updatedData);
      
      // 更新图表的 xAxis 和 series 数据
      option.xAxis[0].data = categoryData;
      option.xAxis[1].data = categoryData;
      option.series[0].data = values;
      option.series[1].data = volumes;

      chart?.setOption(option);  // 更新图表
      return updatedData; // 更新 state
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={klineRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default Kline;
