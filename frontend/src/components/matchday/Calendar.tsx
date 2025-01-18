import {
    useEffect,
    useRef,
    ReactNode,
    forwardRef,
    useImperativeHandle,
    type RefObject,
    type PropsWithChildren,
    useState,
} from "react";

import "cally";
import type {
    CalendarRangeProps,
    CalendarMonthProps,
    CalendarDateProps,
} from "cally";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "calendar-month": unknown;
            "calendar-range": unknown;
            "calendar-date": unknown;
        }
    }
}

function useListener(
    ref: RefObject<HTMLElement>,
    event: string,
    listener?: (e: Event) => void
) {
    useEffect(() => {
        const current = ref.current;

        if (current && listener) {
            current.addEventListener(event, listener);
            return () => current.removeEventListener(event, listener);
        }
    }, [ref, event, listener]);
}

function useProperty(ref: RefObject<HTMLElement>, prop: string, value?: any) {
    useEffect(() => {
        if (ref.current) {
            // @ts-expect-error - TS doesn't know that `prop` is a key
            ref.current[prop] = value;
        }
    }, [ref, prop, value]);
}

export const CalendarMonth = forwardRef(function CalendarMonth(
    props: CalendarMonthProps,
    forwardedRef
) {
    return <calendar-month offset={props.offset} ref={forwardedRef} />;
});

export const CalendarRange = forwardRef(function CalendarRange(
    {
        onChange,
        showOutsideDays,
        firstDayOfWeek,
        isDateDisallowed,
        ...props
    }: PropsWithChildren<CalendarRangeProps>,
    forwardedRef
) {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current, []);
    useListener(ref, "change", onChange);
    useProperty(ref, "isDateDisallowed", isDateDisallowed);

    return (
        <calendar-range
            ref={ref}
            show-outside-days={showOutsideDays || undefined}
            first-day-of-week={firstDayOfWeek}
            {...props}
        />
    );
});

export const CalendarDate = forwardRef(function CalendarDate(
    {
        onChange,
        showOutsideDays,
        firstDayOfWeek,
        isDateDisallowed,
        ...props
    }: PropsWithChildren<CalendarDateProps>,
    forwardedRef
) {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current, []);
    useListener(ref, "change", onChange);
    useProperty(ref, "isDateDisallowed", isDateDisallowed);

    return (
        <calendar-date
            ref={ref}
            show-outside-days={showOutsideDays ? "" : undefined}
            first-day-of-week={firstDayOfWeek}
            {...props}
        />
    );
});

export interface CalendarProps {
    value: any,
    onChange: any
}

export function Calendar({ value, onChange }) {
    return (
        <CalendarDate value={value} onChange={onChange}>
            <svg aria-label="Previous" className="size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="oklch(var(--p))" stroke="oklch(var(--p))"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
            <svg aria-label="Next" className="size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="oklch(var(--p))" stroke="oklch(var(--p))"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
            <CalendarMonth />
        </CalendarDate>
    );
}

// Calendar dropdown component
import { FaRegCalendarAlt } from "react-icons/fa";


export interface CalendarDropdownProps {
    value: string;
    onChanged: (date: string) => void;
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({ value, onChanged }) => {
    const [isDropdownOpen, setIsSetDropdownOpen] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(value));
    const [inputDateValue, setInputDateValue] = useState(value);

    const dropdownRef = useRef<HTMLDivElement>(null)

    const onDateChanged = (event: any) => {
        handleInputDateChanged(event.target.value);
    };

    const handleInputDateChanged = (date: string) => {
        setInputDateValue(date)
        setSelectedDate(new Date(date))
        setIsSetDropdownOpen(false); // Close the calendar after a date is selected
    }

    const handleClick = () => {
        setIsSetDropdownOpen(!isDropdownOpen)
    };

    useEffect(() => {
        onChanged(inputDateValue)
    }, [inputDateValue]);

    return (
        <div>
            <div className="dropdown"
                ref={dropdownRef}
                onBlur={(e) => {
                    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
                        setIsSetDropdownOpen(false);
                    }
                }}>
                <label tabIndex={0} role="input" className="btn input input-bordered bg-base-100 font-normal" onClick={handleClick}>
                    <FaRegCalendarAlt fill="oklch(var(--p))"/>
                    {selectedDate.toLocaleDateString('de-DE', { dateStyle: "long" })}

                </label>
                <div tabIndex={0} className={`dropdown-content menu bg-base-200 rounded-lg z-[1] p-2 shadow-lh border border-base-300 ${isDropdownOpen ? "" : "hidden"}`}>
                    <Calendar value={inputDateValue} onChange={onDateChanged} />
                </div>
            </div>
        </div>
    );
}

export default CalendarDropdown;