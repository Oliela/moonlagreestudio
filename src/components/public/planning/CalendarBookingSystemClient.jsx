'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const moment = {
    add: (date, amount, unit) => {
        const d = new Date(date);
        if (unit === 'days') d.setDate(d.getDate() + amount);
        if (unit === 'month') d.setMonth(d.getMonth() + amount);
        return d;
    },
    startOf: (date, unit) => {
        const d = new Date(date);
        if (unit === 'week') {
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(d.setDate(diff));
        }
        return d;
    },
    isSame: (d1, d2, unit = 'day') => {
        if (unit === 'day') return new Date(d1).toDateString() === new Date(d2).toDateString();
        if (unit === 'month') {
            const a = new Date(d1), b = new Date(d2);
            return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
        }
        return false;
    },
    format: (date, format) => {
        const d = new Date(date);
        if (format === 'MMMM YYYY') return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        return d.toLocaleDateString('fr-FR');
    }
};

export default function CalendarBookingSystemClient({ seances, user }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookings, setBookings] = useState({});
    const [selectedSeance, setSelectedSeance] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const today = new Date();
    const startOfCurrentWeek = moment.startOf(today, 'week');  // Fin de la 2ᵉ semaine autorisée
    const maxAllowedWeek = moment.add(startOfCurrentWeek, 28, 'days');// rajouter pour bloquer le bouton suivant sur 2 semaines

    const weekDays = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];

    const generateWeekDays = () => {
        const startOfWeek = moment.startOf(currentDate, 'week');
        return Array.from({ length: 7 }).map((_, i) => {
            const day = moment.add(startOfWeek, i, 'days');
            const hasClasses = seances.some(s => new Date(s.date).toDateString() === day.toDateString());
            return {
                date: day,
                day: day.getDate(),
                isSelected: moment.isSame(day, selectedDate),
                isToday: moment.isSame(day, new Date()),
                hasClasses
            };
        });
    };

    const getCurrentWeekMonthYear = () => moment.format(currentDate, 'MMMM YYYY');
    const getSelectedDayClasses = () => seances.filter(s => new Date(s.date).toDateString() === selectedDate.toDateString());

    const handleBookClick = (seance) => {
        if (!user) {
            toast.error('Veuillez vous connecter pour réserver une séance.');
            return;
        }
        setSelectedSeance(seance);
        setShowModal(true);
    };
  

    const confirmReservation = async (typePaiement) => {


        try {
            if (!selectedSeance || !user) return;

            const response = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    seanceId: selectedSeance.id,
                    modePaiement: typePaiement,
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success(
                    `Réservation ${typePaiement === "en_ligne" ? "payée en ligne" : "à payer sur place"} confirmée !`
                );
                setShowModal(false);
                setBookings((prev) => ({ ...prev, [selectedSeance.id]: true }));
                setTimeout(() => window.location.reload(), 1500);
            } else {
                toast.error(result.error || "Impossible de réserver la séance.");
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la réservation.");
            console.error(error);
        }
    };

    // ⚠️ Vérifier si le bouton "semaine précédente" doit être désactivé
    const isPrevDisabled = moment.add(currentDate, -7, 'days') < startOfCurrentWeek;
    const isNextDisabled = moment.add(currentDate, 7, 'days') >= maxAllowedWeek; // rajouter pour bloquer le bouton suivant sur 2 semaines


    return (
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col-12 text-center">
                    <div className="text-center bg-primary px-5 title-line rounded-pill"><span className="px-5"></span></div>
                    <h1 className="fw-bold pb-2">Réserver votre session</h1>
                    <p className="text-muted">Réserver, planifier vos sessions</p>
                </div>
            </div>

            {/* Calendrier */}
            <div className="max-w-4xl mx-auto p-6 bg-white mb-5">
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => !isPrevDisabled && setCurrentDate(moment.add(currentDate, -7, 'days'))}
                        disabled={isPrevDisabled}
                        className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <i className="bi bi-arrow-left" style={{ fontSize: "35px" }}></i>
                    </button>

                    <h1 className="text-2xl font-light text-gray-800 capitalize">{getCurrentWeekMonthYear()}</h1>

                    {/* <button
                        onClick={() => setCurrentDate(moment.add(currentDate, 7, 'days'))}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <i className="bi bi-arrow-right" style={{ fontSize: "35px" }}></i>
                    </button> */}

                    <button
                        onClick={() => !isNextDisabled && setCurrentDate(moment.add(currentDate, 7, 'days'))}
                        disabled={isNextDisabled}
                        className={`p-2 hover:bg-gray-100 rounded-full transition-colors
        ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <i className="bi bi-arrow-right" style={{ fontSize: "35px" }}></i>
                    </button>



                </div>

                <div className="grid grid-cols-7 gap-1 mb-4">
                    {weekDays.map(day => <div key={day} className="text-center text-sm font-medium text-gray-500 py-3">{day}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1 mb-8">
                    {generateWeekDays().map((day, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedDate(day.date)}
                            className={`aspect-square flex flex-col items-center justify-center p-2 text-sm transition-all duration-200 relative
                text-gray-700 hover:bg-gray-100
                ${day.isSelected ? 'bg-primary text-white' : ''}
                ${day.isToday && !day.isSelected ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
              `}
                        >
                            <span className="font-medium">{day.day}</span>
                            {day.hasClasses && <div className={`absolute bottom-1 w-1 h-1 rounded-full ${day.isSelected ? 'bg-white' : 'bg-primary'}`}></div>}
                        </button>
                    ))}
                </div>

                <div
                    className="border-t pt-6"
                    // style={{ height: '500px', overflowY: 'scroll' }}
                >
                    <h2 className="text-lg font-medium text-gray-800 mb-6">
                        Disponibilité pour le {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h2>

                    {getSelectedDayClasses().length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p>Aucun cours disponible pour cette date</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {getSelectedDayClasses().map(s => (
                                <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="text-lg text-gray-500 w-20">
                                        {new Date(s.heure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="flex items-center flex-1 mx-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-md font-semibold mr-4 ${s.status === 'Disponible' ? 'bg-secondary' : 'bg-gray-400'}`}>
                                            {s.place_reserver}/{s.places}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{s.titre}</h3>
                                            <p className="text-sm text-gray-600">{s.coatch}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleBookClick(s)}
                                        disabled={s.place_reserver >= s.places || bookings[s.id] || s.status === "Expirée"}
                                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${s.place_reserver < s.places && !bookings[s.id] && s.status !== "Expirée"
                                            ? 'bg-primary text-white hover:bg-amber-700 hover:shadow-md'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {bookings[s.id]
                                            ? 'Réservé'
                                            : s.status === "Expirée"
                                                ? "Terminée"
                                                : s.place_reserver < s.places
                                                    ? 'Réserver'
                                                    : 'Complet'}
                                    </button>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL DE CONFIRMATION */}
            {showModal && selectedSeance && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Confirmer la réservation</h2>
                        <p className="text-gray-700 mb-2"><strong>Session :</strong> {selectedSeance.titre}</p>
                        <p className="text-gray-700 mb-2"><strong>Coach :</strong> {selectedSeance.coatch}</p>
                        <p className="text-gray-700 mb-2">
                            <strong>Date :</strong> {new Date(selectedSeance.date).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Heure :</strong> {new Date(selectedSeance.heure).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-gray-700 mb-4"><strong>Prix :</strong> {selectedSeance.credits} crédit ou {selectedSeance.credits * 10000} cfa </p>

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Annuler</button>
                            <button onClick={() => confirmReservation('sur_place')} className="px-4 py-2 bg-primary text-white rounded-lg  hover:bg-amber-700">Payer sur place</button>
                            <button onClick={() => confirmReservation('en_ligne')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Utiliser un crédit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
