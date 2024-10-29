import React, { useState } from 'react';

const BookingForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Name: ${name}, Email: ${email}`);
        // Här kan du skicka data till servern
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-lg font-bold">Boka en tid</h2>
            <div>
                <label className="block mb-1">Namn:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-1 w-full"
                    required
                />
            </div>
            <div>
                <label className="block mb-1">E-post:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-1 w-full"
                    required
                />
            </div>
            <button type="submit" className="mt-2 bg-blue-600 text-white py-1 px-4 rounded">
                Boka
            </button>
        </form>
    );
};

export default BookingForm;