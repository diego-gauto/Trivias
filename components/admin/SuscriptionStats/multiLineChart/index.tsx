import React, { useEffect, useRef } from "react";

import { createChart, ColorType, LineData, Time } from "lightweight-charts";

import {
  StatsByDate,
  StatsByRange,
} from "../../../../containers/SuscriptionStats/ISuscrioptionsStats";

interface VisibleSeries {
  new: boolean;
  renewed: boolean;
  reactive: boolean;
  canceled: boolean;
  inactive: boolean;
}

// Interfaz para las props del componente MultiLineChart
interface MultiLineChartProps {
  membershipsStats: StatsByRange | undefined;
  visibleSeries: VisibleSeries;  // Usando la interfaz modular
}

const getMembershipsByDate = (statsByDate: StatsByDate): LineData[] => {
  const lineData: LineData[] = [];

  Object.keys(statsByDate).forEach(date => {
    const stats = statsByDate[date];
    if (stats) {
      const value = Number(stats.anual_count) + Number(stats.cuatri_count) + Number(stats.mensual_count);
      lineData.push({
        time: date as Time, // Convertimos la fecha a tipo `Time`
        value,              // Sumamos los valores
      });
    }
  });

  return lineData;
};

const chartOptions = {
  layout: {
    textColor: 'black',
    background: { type: ColorType.Solid, color: 'white' },
  },
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
    tickMarkFormatter: (time: string): string => {
      // Obtener fecha en UTC para evitar problemas de zona horaria
      const date = new Date(Date.UTC(
        parseInt(time.slice(0, 4)),   // Año
        parseInt(time.slice(5, 7)) - 1,  // Mes (0-indexed)
        parseInt(time.slice(8, 10))  // Día
      ));
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      return `${day}-${month}-${year}`;  // Formato dd-mm-aaaa
    },
  },
};


const MultiLineChart = ({ membershipsStats, visibleSeries }: MultiLineChartProps) => {

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


      const lineSeriesNew = chart.addLineSeries({ color: '#629753', lastValueVisible: false });
      const lineSeriesRenewel = chart.addLineSeries({ color: '#2962FF', lastValueVisible: false });
      const lineSeriesReactive = chart.addLineSeries({ color: '#40E0D0', lastValueVisible: false });
      const lineSeriesCanceled = chart.addLineSeries({ color: '#E1575A', lastValueVisible: false })
      const lineSeriesInactive = chart.addLineSeries({ color: '#F28E2C', lastValueVisible: false })

      const lineSeriesNewData = getMembershipsByDate(membershipsStats?.new || {});
      const lineSeriesRenewelData = getMembershipsByDate(membershipsStats?.renewed || {});
      const lineSeriesReactiveData = getMembershipsByDate(membershipsStats?.reactive || {});
      const lineSeriesCanceledData = getMembershipsByDate(membershipsStats?.canceled || {});
      const lineSeriesInactiveData = getMembershipsByDate(membershipsStats?.inactive || {});

      if (visibleSeries.new) lineSeriesNew.setData(lineSeriesNewData);
      if (visibleSeries.renewed) lineSeriesRenewel.setData(lineSeriesRenewelData);
      if (visibleSeries.reactive) lineSeriesReactive.setData(lineSeriesReactiveData);
      if (visibleSeries.canceled) lineSeriesCanceled.setData(lineSeriesCanceledData);
      if (visibleSeries.inactive) lineSeriesInactive.setData(lineSeriesInactiveData);

      chart.timeScale().fitContent();

      chart.applyOptions({
        localization: {
          priceFormatter: (price: number) => price.toFixed(0)
        }
      })

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [membershipsStats, visibleSeries]);

  return (
    <div ref={chartContainerRef} style={{ height: '500px', width: '1100px', alignItems: 'center' }} />
  );
};


export default MultiLineChart