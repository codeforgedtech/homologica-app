import React, { useState } from 'react';
import BookingPage from './BookingPage'; 
interface Service {
    id: number;
    name: string;
    description: string;
    duration: string;
    price: string;
}

interface ServiceCategory {
    categoryName: string;
    services: Service[];
}

const serviceCategories: ServiceCategory[] = [
    {
        categoryName: 'Färgning & Klippning',
        services: [
            { id: 1, name: 'Avfärgning/byta hårfärg/ avancerad behandling', description: '', duration: '180 minuter', price: '2 000 kr' },
            { id: 2, name: 'Färg av utväxt max 3 cm', description: '', duration: '60 minuter', price: '1 000 kr' },
            { id: 3, name: 'Hårfärgning utan klippning, hela håret', description: '', duration: '90 minuter', price: '1 200 kr' },
            { id: 4, name: 'Hårfärgning, hela håret och klippning. Mellanlångt/långt', description: '', duration: '100 minuter', price: '1 600 kr' },
            { id: 5, name: 'Klipp & färg & slingor inkl styling kort/mellanlång', description: '', duration: '120 minuter', price: '1 600 kr' },
            { id: 6, name: 'Klipp & färg utväxt < 4 cm', description: '', duration: '90 minuter', price: '1 400 kr' },
        ],
    },
    {
        categoryName: 'Föning & Styling',
        services: [
            { id: 7, name: 'Föning', description: '', duration: '30 minuter', price: '150 kr' },
        ],
    },
    {
        categoryName: 'Fransar & Brynbehandling',
        services: [
            { id: 8, name: 'Brynfärg och plockning med pincett', description: '', duration: '30 minuter', price: '400 kr' },
            { id: 9, name: 'Brynplock enstaka strån', description: '', duration: '30 minuter', price: '150 kr' },
            { id: 10, name: 'Brynvax', description: '', duration: '30 minuter', price: '300 kr' },
            { id: 11, name: 'Brynvax färg & fransfärg', description: '', duration: '30 minuter', price: '600 kr' },
            { id: 12, name: 'Brynvax ink färg', description: '', duration: '30 minuter', price: '400 kr' },
        ],
    },
    {
        categoryName: 'Friskvårdstimme',
        services: [
            { id: 13, name: 'Friskvårdstimme', description: '', duration: '60 minuter', price: '600 kr' },
        ],
    },
    {
        categoryName: 'Klippning',
        services: [
            { id: 14, name: 'Klipp barn 0-12 år', description: '', duration: '30 minuter', price: '340 kr' },
            { id: 15, name: 'Klipp långt hår toppar utan tvätt & styling', description: '', duration: '30 minuter', price: '450 kr' },
            { id: 16, name: 'Klippning kort/mellanlång ink tvätt & styling', description: '', duration: '45 minuter', price: '490 kr' },
            { id: 17, name: 'Klippning Kort/mellanlångt utan tvätt & styling', description: '', duration: '30 minuter', price: '470 kr' },
            { id: 18, name: 'Kort frisyr med maskin utan tvätt & styling', description: '', duration: '30 minuter', price: '350 kr' },
        ],
    },
    {
        categoryName: 'Massage',
        services: [
            { id: 19, name: 'Avslappnande och välgörande massage av ansikte huvud och axlar', description: '', duration: '60 minuter', price: '800 kr' },
            { id: 20, name: 'Massage med medicinsk laser, 5 ggr-kort första besöket', description: '', duration: '30 minuter', price: '1 800 kr' },
            { id: 21, name: 'Massage med medicinsk laser, besök 2-5', description: '', duration: '30 minuter', price: 'Varierande pris' },
            { id: 22, name: 'Massage med medicinsk laser, enstaka behandlingstillfälle', description: '', duration: '30 minuter', price: '500 kr' },
            { id: 23, name: 'Reiki Healingbehandling', description: '', duration: '60 minuter', price: '600 kr' },
            { id: 24, name: 'Shiatsumassage halvkropp baksida eller framsida', description: '', duration: '45 minuter', price: '450 kr' },
            { id: 25, name: 'Shiatsumassage helkropp', description: '', duration: '70 minuter', price: '850 kr' },
            { id: 26, name: 'Shiatsumassage i kombination med medicinsk laser och moxa', description: '', duration: '90 minuter', price: '1 000 kr' },
        ],
    },
    {
        categoryName: 'Nagelbehandlingar Hos Gittan (EJ Hos Cornelia)',
        services: [
            { id: 27, name: 'Återbesök formar 3< trasiga naglar', description: '', duration: '60 minuter', price: '900 kr' },
            { id: 28, name: 'Återbesök tippar', description: '', duration: '60 minuter', price: '770 kr' },
            { id: 29, name: 'Borttagning av material från Homologica', description: '', duration: '45 minuter', price: '400 kr' },
            { id: 30, name: 'Borttagning av nagelmaterial annan terapeut', description: '', duration: '45 minuter', price: '600 kr' },
            { id: 31, name: 'Gellack konstnagel', description: '', duration: '45 minuter', price: '500 kr' },
            { id: 32, name: 'Gellack naturlig nagel', description: '', duration: '45 minuter', price: '470 kr' },
            { id: 33, name: 'Naglar nytt set formar', description: '', duration: '90 minuter', price: '900 kr' },
            { id: 34, name: 'Naglar nytt set tippar', description: '', duration: '60 minuter', price: '790 kr' },
        ],
    },
    {
        categoryName: 'Permanent- & Volymbehandling',
        services: [
            { id: 35, name: 'Klipp & permanent kort/mellanlångt hår', description: '', duration: '90 minuter', price: '1 500 kr' },
            { id: 36, name: 'Klipp & permanent långt hår', description: '', duration: '120 minuter', price: '1 800 kr' },
        ],
    },
    {
        categoryName: 'Slingbehandlingar & Klippning',
        services: [
            { id: 37, name: 'Folieslingor & klippning mellan/långt hår', description: '', duration: '150 minuter', price: '1 700 kr' },
            { id: 38, name: 'Nyansering av slingor (kompletterandebehandling)', description: '', duration: '30 minuter', price: '250 kr' },
            { id: 39, name: 'Slingor i hätta inkl klipp kort/mellanlångt hår', description: '', duration: '90 minuter', price: '1 400 kr' },
        ],
    },
    {
        categoryName: 'Tibetansk Ansiktsmassage',
        services: [
            { id: 40, name: 'Påfyllnad kur behandling 2-4 Tibetansk ansiktsmassage', description: '', duration: '60 minuter', price: 'Varierande pris' },
            { id: 41, name: 'Tibetansk ansiktsmassage kurpaket 4 ggr: 1.a behandling', description: '', duration: '60 minuter', price: '2 900 kr' },
            { id: 42, name: 'Prova-på-behandling Tibetansk ansiktsmassage', description: '', duration: '25 minuter', price: '350 kr' },
            { id: 43, name: 'Tibetansk ansiktsmassage', description: '', duration: '60 minuter', price: '800 kr' },
            { id: 44, name: 'Tibetansk ansiktsmassage med rengöring, peeling & mask', description: '', duration: '70 minuter', price: '950 kr' },
        ],
    },
];

const ServiceList: React.FC = () => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const toggleCategory = (categoryName: string) => {
        setExpandedCategory(prev => (prev === categoryName ? null : categoryName));
    };

    if (selectedService) {
        return (
            <BookingPage
                serviceName={selectedService.name}
                onBack={() => setSelectedService(null)}
            />
        );
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h1 style={{ color: '#333', textAlign: 'center', paddingBottom: '20px' }}>Tjänster</h1>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {serviceCategories.map((category) => (
                        <li key={category.categoryName} id={category.categoryName.replace(/\s/g, '-')}>
                            <h2
                                className="serviceCategory"
                                onClick={() => toggleCategory(category.categoryName)}
                                style={{
                                    fontSize: '1.4em',
                                    color: '#007bff',
                                    cursor: 'pointer',
                                    margin: '10px 0',
                                    borderBottom: '1px solid #ddd',
                                    paddingBottom: '5px',
                                    transition: 'color 0.3s'
                                }}
                            >
                                {category.categoryName}
                            </h2>
                            {expandedCategory === category.categoryName && (
                                <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                                    {category.services.map((service) => (
                                        <li key={service.id} style={{
                                            backgroundColor: '#fff',
                                            padding: '15px',
                                            margin: '10px 0',
                                            borderRadius: '8px',
                                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <h3 style={{ fontSize: '1.2em', color: '#444' }}>{service.name}</h3>
                                            <p style={{ margin: '5px 0', color: '#666' }}>{service.description}</p>
                                            <p style={{ margin: '5px 0', color: '#666' }}>{service.duration}, {service.price}</p>
                                            <button
                                                onClick={() => setSelectedService(service)}
                                                style={{
                                                    backgroundColor: '#007bff',
                                                    color: '#fff',
                                                    padding: '10px 20px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                                            >
                                                Boka
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ServiceList;

