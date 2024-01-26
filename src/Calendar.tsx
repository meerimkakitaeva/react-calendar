import React, {useState} from 'react';

const Calendar: React.FC = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const firstDayOfWeek = (firstDayOfMonth + 6) % 7;

    const onDateClick = (day: number) => {
        console.log(`${currentMonth.getMonth() + 1}/${day}/${currentMonth.getFullYear()}`);
    };

    const onMonthChange = (increment: number) => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1);
        setCurrentMonth(newMonth);
    };

    return (
        <div className="calendar-container">
            <div className="title">
                <button onClick={() => onMonthChange(-1)}>Previous</button>
                <h2>{`${currentMonth.toLocaleString('en-US', {month: 'long'})} ${currentMonth.getFullYear()}`}</h2>
                <button onClick={() => onMonthChange(1)}>Next</button>
            </div>
            <table>
                <thead>
                <tr>
                    {days.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({length: Math.ceil((daysInMonth + firstDayOfWeek) / 7)}, (_, weekIndex) => (
                    <tr key={weekIndex}>
                        {days.map((_, dayIndex) => {
                            const dayOfMonth = weekIndex * 7 + dayIndex - firstDayOfWeek + 1;
                            const isCurrentMonthDay = dayOfMonth > 0 && dayOfMonth <= daysInMonth;
                            const isActiveDay = isCurrentMonthDay && new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayOfMonth).toDateString();

                            return (
                                <td
                                    key={dayOfMonth}
                                    className={`cell ${isCurrentMonthDay ? 'day' : 'empty'} ${isActiveDay ? 'active' : ''}`}
                                    onClick={() => isCurrentMonthDay && onDateClick(dayOfMonth)}
                                >
                                    {isCurrentMonthDay ? dayOfMonth : ''}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;