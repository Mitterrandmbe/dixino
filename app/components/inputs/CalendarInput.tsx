
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import fr from 'date-fns/locale/fr';


interface DateTimePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    onClick: (value: Date) => void;
}


const CalendarInput: React.FC<DateTimePickerProps> = ({
    value,
    onChange,
    onClick,
}) => {

    const currentDate = new Date();

    return (
    <div className="w-full relative flex flex-col gap-8">
        <div className="flex flex-row item-center text-xl">
            <DateTimePicker 
                onChange={(date) => onChange(date as Date)}
                value={value}
                className="bg-white"
                locale="fr"
                disableClock
                minDate={currentDate}
                onClick={onClick}
            />
        </div>
        
    </div>
  )
}

export default CalendarInput