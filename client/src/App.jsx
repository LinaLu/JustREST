import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || ''

function formatDateTime(isoString) {
  const d = new Date(isoString)
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  return `${hours}.${minutes} ${day}.${month}.${year}`
}

function formatDateTimeShort(isoString) {
  const d = new Date(isoString)
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const day = d.getDate()
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  return `${hours}.${minutes} ${day}.${month}.${year}`
}

export default function App() {
  const [view, setView] = useState('appointments') // 'appointments' | 'timeslots' | 'confirmation'
  const [appointments, setAppointments] = useState([])
  const [timeslots, setTimeslots] = useState([])
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)
  const [newDateTime, setNewDateTime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAppointments = () => {
    setLoading(true)
    setError(null)
    fetch(`${API}/api/appointments`)
      .then((r) => r.json())
      .then((data) => {
        setAppointments(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load appointments.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleRescheduleClick = (appointmentExternalId) => {
    setSelectedAppointmentId(appointmentExternalId)
    setLoading(true)
    setError(null)
    fetch(`${API}/api/timeslots`)
      .then((r) => r.json())
      .then((data) => {
        setTimeslots(data)
        setLoading(false)
        setView('timeslots')
      })
      .catch(() => {
        setError('Failed to load timeslots.')
        setLoading(false)
      })
  }

  const handleTimeslotSelect = (timeslot) => {
    setLoading(true)
    setError(null)
    fetch(`${API}/api/appointments/${selectedAppointmentId}/reschedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ externalReference: timeslot.externalReference }),
    })
      .then((r) => r.json())
      .then((data) => {
        setNewDateTime(data.newDateTime)
        setLoading(false)
        setView('confirmation')
      })
      .catch(() => {
        setError('Failed to reschedule appointment.')
        setLoading(false)
      })
  }

  const handleBackToAppointments = () => {
    setView('appointments')
    setSelectedAppointmentId(null)
    setNewDateTime(null)
    setError(null)
    fetchAppointments()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Healtz</h1>

        {view === 'appointments' && (
          <>
            <p className="text-lg text-gray-600 mb-4">
              Patient: <span className="font-semibold text-gray-800">Anna Mäkinen</span>
            </p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
              <p className="text-gray-500">Loading appointments...</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <div key={appt.externalReference} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold text-gray-800">{appt.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">{appt.doctor}</p>
                        <p className="text-sm text-gray-600 mt-1">{formatDateTime(appt.dateTime)}</p>
                      </div>
                      <button
                        onClick={() => handleRescheduleClick(appt.externalReference)}
                        className="ml-4 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'timeslots' && (
          <>
            <div className="flex items-center mb-4 gap-3">
              <button
                onClick={() => setView('appointments')}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Choose a new timeslot</h2>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
              <p className="text-gray-500">Loading timeslots...</p>
            ) : (
              <div className="space-y-3">
                {timeslots.map((ts) => (
                  <button
                    key={ts.externalReference}
                    onClick={() => handleTimeslotSelect(ts)}
                    className="w-full text-left bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <p className="font-semibold text-gray-800">{formatDateTime(ts.dateTime)}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{ts.doctor}</p>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'confirmation' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-green-500 text-4xl mb-3">&#10003;</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Appointment rescheduled</h2>
            <p className="text-gray-600">
              Your appointment has been rescheduled to{' '}
              <span className="font-semibold">{newDateTime ? formatDateTimeShort(newDateTime) : ''}</span>.
            </p>
            <button
              onClick={handleBackToAppointments}
              className="mt-5 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Back to appointments
            </button>
          </div>
        )}
      </div>
    </div>
  )
}