import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';

// Typ för behandlingar
interface Treatment {
    name: string;
    duration: number; // i minuter
    price: number; // i kronor
}

// Tillgängliga behandlingar
const treatments: Treatment[] = [
    { name: 'Färgning & Klippning', duration: 180, price: 2000 },
    { name: 'Avfärgning/byta hårfärg/avancerad behandling', duration: 180, price: 2000 },
    { name: 'Färg av utväxt max 3 cm', duration: 60, price: 1000 },
    { name: 'Hårfärgning utan klippning, hela håret', duration: 90, price: 1200 },
    { name: 'Hårfärgning, hela håret och klippning. Mellanlångt/långt', duration: 100, price: 1600 },
    { name: 'Klipp & färg & slingor inkl styling kort/mellanlång', duration: 120, price: 1600 },
    { name: 'Klipp & färg utväxt < 4 cm', duration: 90, price: 1400 },
];

interface AvailableSlots {
    [date: string]: string[];
}

// Exempel på tillgängliga tider för olika tjänster
const availableSlots: { [treatmentName: string]: AvailableSlots } = {
    'Färgning & Klippning': {
        '2024-10-27': ['10:00', '15:00'],
        '2024-10-28': ['09:00', '12:00', '16:00'],
    },
    'Avfärgning/byta hårfärg/avancerad behandling': {
        '2024-10-27': ['12:00'],
    },
    'Färg av utväxt max 3 cm': {
        '2024-10-28': ['10:00'],
    },
    'Hårfärgning utan klippning, hela håret': {
        '2024-10-27': ['11:00', '13:00'],
    },
    // Lägg till fler tillgängliga tider för andra behandlingar här...
};

const BookingPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isConfirmingDetails, setIsConfirmingDetails] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

    const handleTreatmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const treatmentName = event.target.value;
        const treatment = treatments.find(t => t.name === treatmentName) || null;
        setSelectedTreatment(treatment);
        setAvailableTimes([]); // Töm tillgängliga tider när behandlingen ändras
        setSelectedTime(null); // Återställ vald tid
    };

    const handleDateSelection = (date: Date | null) => {
        setSelectedDate(date);
        if (date && selectedTreatment) {
            const formattedDate = date.toISOString().split('T')[0];
            const slots = availableSlots[selectedTreatment.name][formattedDate] || []; // Hämta tillgängliga tider för vald behandling
            setAvailableTimes(slots);
            setSelectedTime(null); // Återställ vald tid när datumet ändras
        } else {
            setAvailableTimes([]);
        }
    };

    const handleTimeSelection = (time: string | null) => setSelectedTime(time);

    const handleBookingConfirmation = () => {
        if (selectedDate && selectedTime) {
            setIsConfirmingDetails(true);
        } else {
            alert('Vänligen välj både datum och tid.');
        }
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTreatment) {
            alert(`Bokning för ${selectedTreatment.name} är bekräftad på ${selectedDate!.toLocaleDateString()} kl. ${selectedTime}
            \nNamn: ${userName}\nE-post: ${userEmail}\nTelefon: ${userPhone}`);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <div style={{ maxWidth: '400px', width: '100%', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
                    {isConfirmingDetails ? 'Bekräfta dina uppgifter' : 'Boka Behandling'}
                </h2>

                {!isConfirmingDetails ? (
                    // Första skärmen för val av tid och datum
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Välj behandling:</label>
                            <select onChange={handleTreatmentChange} style={inputStyle}>
                                <option value="" disabled>Välj en behandling</option>
                                {treatments.map((treatment) => (
                                    <option key={treatment.name} value={treatment.name}>{treatment.name} - {treatment.price} kr</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Välj datum:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateSelection}
                                filterDate={(date) => {
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return selectedTreatment ? availableSlots[selectedTreatment.name][formattedDate]?.length > 0 : false; // Filtrera för att visa endast tillgängliga datum
                                }}
                                placeholderText="Välj ett datum"
                                className="border rounded"
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        {availableTimes.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Välj tid:</label>
                                <select
                                    value={selectedTime || ''}
                                    onChange={(e) => handleTimeSelection(e.target.value)}
                                    style={inputStyle}
                                    required
                                >
                                    <option value="" disabled>Välj tid</option>
                                    {availableTimes.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <Button onClick={handleBookingConfirmation} bgColor='#007bff' hoverColor='#0056b3'>
                                Bekräfta bokning
                            </Button>
                            <Button onClick={onBack} bgColor='#ccc' hoverColor='#aaa'>
                                Tillbaka
                            </Button>
                        </div>
                    </form>
                ) : (
                    // Andra skärmen för att fylla i kontaktinformation
                    <form onSubmit={handleFinalSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Namn:</label>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required
                                style={inputStyle} placeholder="Ditt namn" />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>E-post:</label>
                            <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required
                                style={inputStyle} placeholder="Din e-postadress" />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Telefon:</label>
                            <input type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required
                                style={inputStyle} placeholder="Ditt telefonnummer" />
                        </div>
                        <button type="submit" style={buttonStyle('#007bff', '#0056b3')}>Bekräfta uppgifter</button>
                    </form>
                )}
            </div>
        </div>
    );
};

// Gemensamma stilar för knappar och inputfält
const buttonStyle = (bgColor: string, hoverColor: string) => ({
    backgroundColor: bgColor,
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
});

const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
};

const Button: React.FC<{ onClick: () => void; bgColor: string; hoverColor: string }> = ({ onClick, bgColor, hoverColor, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonStyleWithHover = {
        ...buttonStyle(bgColor, hoverColor),
        backgroundColor: isHovered ? hoverColor : bgColor,
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={buttonStyleWithHover}
        >
            {children}
        </button>
    );
};

export default BookingPage;









