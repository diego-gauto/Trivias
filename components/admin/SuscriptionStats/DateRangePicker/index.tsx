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
import enUS from "date-fns/locale/en-US";

import {
  CalendarResponse,
  Period,
} from "../../../../containers/SuscriptionStats/ISuscrioptionsStats";
import styles from "./dateRangePicker.module.css";

interface DateRangePickerCompProps {
  setRange: (range: CalendarResponse) => void;
  range: CalendarResponse;
}

interface RangeCalendar {
  startDate: Date;
  endDate: Date;
  key: string;
}

const today = new Date();

function rangeKeyDictToCalendarResponse(rangeKeyDict: RangeCalendar): CalendarResponse {
  const startDate = rangeKeyDict.startDate ? format(rangeKeyDict.startDate, 'yyyy-MM-dd') : '';
  const endDate = rangeKeyDict.endDate ? format(min([rangeKeyDict.endDate, today]), 'yyyy-MM-dd') : '';

  let period: Period = 'custom';

  if (startDate === endDate) {
    if (isToday(rangeKeyDict.startDate)) {
      period = 'today';
    } else if (isYesterday(rangeKeyDict.startDate)) {
      period = 'yesterday';
    } else {
      period = 'customDay';
    }
  } else {
    const thisWeekStart = startOfWeek(today, { weekStartsOn: 0 });
    const thisWeekEnd = endOfWeek(today, { weekStartsOn: 0 });
    const lastWeekStart = startOfWeek(subDays(today, 7), { weekStartsOn: 0 });
    const lastWeekEnd = endOfWeek(subDays(today, 7), { weekStartsOn: 0 });
    const thisMonthStart = startOfMonth(today);
    const thisMonthEnd = endOfMonth(today);
    const lastMonthStart = startOfMonth(addMonths(today, -1));
    const lastMonthEnd = endOfMonth(addMonths(today, -1));

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
  const { dateInput, showPickerContainer, inputContainer, calendarElement } = styles;
  const [showPicker, setShowPicker] = useState(false);
  const [rangeCalendar, setRangeCalendar] = useState<RangeCalendar>({
    startDate: subDays(today, 6),
    endDate: today,
    key: 'selection',
  });

  const refOne = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref para el botón

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

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refOne.current && !refOne.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refOne]);

  // Manejador para alternar la visibilidad del calendario
  const handleTogglePicker = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation(); // Evitar la propagación del evento
    setShowPicker((prev) => !prev);
  };

  return (
    <div className="calendarWrap">
      <div className={showPickerContainer}>
        <button ref={buttonRef} onClick={handleTogglePicker}>
          {showPicker ? "Ocultar Calendario" : "Mostrar Calendario"}
        </button>
        {!showPicker && (
          <div className={inputContainer}>
            <input
              className={dateInput}
              value={format(rangeCalendar.startDate, 'MMM dd, yyyy')}
              readOnly
            />
            <input
              className={dateInput}
              value={format(rangeCalendar.endDate, 'MMM dd, yyyy')}
              readOnly
            />
          </div>
        )}
      </div>

      {showPicker && (
        <div ref={refOne}>
          <DateRangePicker
            onChange={(item: RangeKeyDict) => {
              const selection = item.selection as RangeCalendar;
              setRangeCalendar(selection);
              setRange(rangeKeyDictToCalendarResponse(selection));
              setShowPicker(false); // Ocultar el calendario al seleccionar
            }}
            editableDateInputs={false}
            moveRangeOnFirstSelection={false}
            ranges={[rangeCalendar]}
            rangeColors={['#952ced']}
            months={2}
            minDate={new Date(2024, 0, 1)}
            maxDate={today}
            direction="horizontal"
            className={calendarElement}
            calendarFocus="backwards"
            preventSnapRefocus={true}
            locale={enUS}
            fixedHeight={true}
          />
        </div>
      )}
    </div>
  );
});

export default DateRangePickerComp;

