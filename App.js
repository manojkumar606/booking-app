import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [slots, setSlots] = useState([]);

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split('T')[0];

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/reset-slots', { date: formattedDate });
            alert(response.data.message);
            setSlots(response.data.slots);
        } catch (error) {
            console.error(error);
            alert('Error resetting slots');
        }
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h2>Booking Date Picker</h2>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText="Select a date to reset slots"
            />
            <h3 style={{ marginTop: '2rem' }}>
                Available Slots for {selectedDate ? selectedDate.toDateString() : '...'}
            </h3>
            <ul>
                {slots.map((slot, index) => (
                    <li key={index}>{slot}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
