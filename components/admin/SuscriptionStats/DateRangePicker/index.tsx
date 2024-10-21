import { memo, useEffect, useRef, useState } from "react";

import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isToday,
  isYesterday,
  min,
  parse,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";

import {
  CalendarResponse,
  Period,
} from "../../../../containers/SuscriptionStats/ISuscrioptionsStats";

interface DateRangePickerCompProps {
  setRange: (range: CalendarResponse) => void;
  range: CalendarResponse; // Pasar el rango desde el padre para sincronización
}
// Define types for the range state
interface RangeCalendar {
  startDate: Date;
  endDate: Date;
  key: string;
}

const today = new Date()

function rangeKeyDictToCalendarResponse(rangeKeyDict: RangeCalendar): CalendarResponse {
  // Asumimos que la clave relevante es 'selection', pero puedes adaptarlo si es necesario

  const startDate = rangeKeyDict.startDate ? format(rangeKeyDict.startDate, 'yyyy-MM-dd') : '';
  const endDate = rangeKeyDict.endDate ? format(min([rangeKeyDict.endDate, today]), 'yyyy-MM-dd') : '';

  let period: Period = 'custom'; // Valor predeterminado

  if (startDate === endDate) {
    // Mismo día
    if (isToday(rangeKeyDict.startDate)) {
      period = 'today';
    } else if (isYesterday(rangeKeyDict.startDate)) {
      period = 'yesterday';
    } else {
      period = 'customDay'; // Un solo día, pero no today o yesterday
    }
  } else {
    // Rango de fechas
    const thisWeekStart = startOfWeek(today, { weekStartsOn: 0 });
    console.log(thisWeekStart)
    const thisWeekEnd = endOfWeek(today, { weekStartsOn: 0 });
    console.log(thisWeekEnd)
    const lastWeekStart = startOfWeek(subDays(today, 7), { weekStartsOn: 0 });
    console.log(lastWeekStart)
    const lastWeekEnd = endOfWeek(subDays(today, 7), { weekStartsOn: 0 });
    console.log(lastWeekEnd)
    const thisMonthStart = startOfMonth(today);
    const thisMonthEnd = endOfMonth(today);
    const lastMonthStart = startOfMonth(addMonths(today, -1));
    const lastMonthEnd = endOfMonth(addMonths(today, -1));

    // Verificar si el rango es de esta semana
    if (isSameDay(rangeKeyDict.startDate, thisWeekStart) && isSameDay(rangeKeyDict.endDate, thisWeekEnd)) {
      period = 'thisWeek';
    } else if (isSameDay(rangeKeyDict.startDate, lastWeekStart) && isSameDay(rangeKeyDict.endDate, lastWeekEnd)) {
      period = 'lastWeek';
    } else if (isSameDay(rangeKeyDict.startDate, thisMonthStart) && isSameDay(rangeKeyDict.endDate, thisMonthEnd)) {
      period = 'thisMonth';
    } else if (isSameDay(rangeKeyDict.startDate, lastMonthStart) && isSameDay(rangeKeyDict.endDate, lastMonthEnd)) {
      period = 'lastMonth';
    }
  }

  return {
    startDate,
    endDate,
    period: period,
  };
}

const DateRangePickerComp: React.FC<DateRangePickerCompProps> = memo(({ setRange, range }) => {

  const [rangeCalendar, setRangeCalendar] = useState<RangeCalendar>({
    startDate: subDays(today, 6),
    endDate: today,
    key: 'selection',
  });

  useEffect(() => {

    if (
      format(rangeCalendar.startDate, 'yyyy-MM-dd') !== range.startDate ||
      format(rangeCalendar.endDate, 'yyyy-MM-dd') !== range.endDate
    ) {
      setRangeCalendar({
        startDate: parse(range.startDate, 'yyyy-MM-dd', new Date()),
        endDate: parse(range.endDate, 'yyyy-MM-dd', new Date()),
        key: 'selection',
      });
    }
  }, [range]);

  // get the target element to toggle
  const refOne = useRef<HTMLDivElement>(null);

  return (
    <div className="calendarWrap">

      <div ref={refOne}>
        {(
          <DateRangePicker
            onChange={(item: RangeKeyDict) => {
              console.log(item)
              const selection = item.selection as RangeCalendar;
              setRangeCalendar(selection);
              setRange(rangeKeyDictToCalendarResponse(selection));
            }}
            editableDateInputs={false}
            moveRangeOnFirstSelection={false}
            ranges={[rangeCalendar]}
            rangeColors={['#952ced']}
            months={2}
            minDate={new Date(2024, 0, 1)}
            maxDate={today}
            direction="horizontal"
            className="calendarElement"
            calendarFocus="backwards"
            preventSnapRefocus={true}
          />
        )}
      </div>
    </div>
  );
});

export default DateRangePickerComp;
