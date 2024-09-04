import React, { useEffect, useRef } from "react";

import { createChart, ColorType, LineData, Time } from "lightweight-charts";

type TimeString = string;


interface Colors {
  backgroundColor?: string;
  lineColor?: string;
  textColor?: string;
  areaTopColor?: string;
  areaBottomColor?: string;
}

interface DataPoint {
  time: Time;
  value: number;
}

interface Props {
  data: DataPoint[];
  colors?: Colors;
}

function generateLineData(numberOfPoints = 100): LineData[] {

  const samplePoint = (i: number) =>
    i *
    (0.5 +
      Math.sin(i / 10) * 0.2 +
      Math.sin(i / 20) * 0.4 +
      Math.sin(i / randomFactor) * 0.8 +
      Math.sin(i / 500) * 0.5) +
    200;
  const randomFactor = 25 + Math.random() * 25;
  const res: LineData[] = [];
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));

  for (let i = 0; i < numberOfPoints; ++i) {
    const time = date.toISOString().split('T')[0]; // Convertir a cadena en formato ISO (solo fecha)
    const value = samplePoint(i);

    res.push({
      time: time as unknown as Time, // Asegurar el tipo Time
      value,
    });

    date.setUTCDate(date.getUTCDate() + 1);
  }

  return res;
}

const chartOptions = {
  layout: {
    textColor: 'black',
    background: { type: ColorType.Solid, color: 'white' },
  },
};


const MultiLineChart = () => {

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartContainerRef.current !== null) {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
      };

      const chart = createChart(chartContainerRef.current, {
        ...chartOptions,
        width: chartContainerRef.current.clientWidth,
        height: 300,
      });


      const lineSeriesOne = chart.addLineSeries({ color: '#2962FF' });
      const lineSeriesTwo = chart.addLineSeries({ color: 'rgb(225, 87, 90)' });
      const lineSeriesThree = chart.addLineSeries({ color: 'rgb(242, 142, 44)' });

      const lineSeriesOneData = generateLineData();
      const lineSeriesTwoData = generateLineData();
      const lineSeriesThreeData = generateLineData();

      lineSeriesOne.setData(lineSeriesOneData);
      lineSeriesTwo.setData(lineSeriesTwoData);
      lineSeriesThree.setData(lineSeriesThreeData);
      console.log(lineSeriesOneData)
      console.log(lineSeriesTwoData)
      console.log(lineSeriesThreeData)

      chart.timeScale().fitContent();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, []);

  return (
    <div ref={chartContainerRef} style={{ height: '500px' }} />
  );
};


export default MultiLineChart