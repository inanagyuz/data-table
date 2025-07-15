"use client";

import React, {useState} from "react";
import {addDays} from "date-fns";
import {DateRange} from "react-day-picker";
import {Column} from "@tanstack/react-table";
import {Calendar} from "@/components/ui/calendar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTableInputDate({column}: { column: Column<any, unknown> }) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });

    const onDateChange = (date: DateRange | undefined) => {
        setDate(date);
        column.setFilterValue(date);
    };

    return (
        <Calendar          
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
        />
    );
}