const SYSTEM = 'ehr'

const appointments = [
  { id: 'appt-001', title: 'General Checkup',       doctor: 'Dr. Erik Lindqvist',  dateTime: '2026-07-10T09:00:00.000Z', status: 'scheduled' },
  { id: 'appt-002', title: 'Blood Test Follow-up',  doctor: 'Dr. Anna Bergström',  dateTime: '2026-07-15T11:30:00.000Z', status: 'scheduled' },
  { id: 'appt-003', title: 'Physiotherapy Session', doctor: 'Dr. Maria Söderberg', dateTime: '2026-07-22T14:00:00.000Z', status: 'scheduled' },
]

const timeslots = [
  { id: 'slot-001', dateTime: '2026-07-11T08:00:00.000Z', doctor: 'Dr. Erik Lindqvist' },
  { id: 'slot-002', dateTime: '2026-07-12T10:30:00.000Z', doctor: 'Dr. Anna Bergström' },
  { id: 'slot-003', dateTime: '2026-07-14T13:00:00.000Z', doctor: 'Dr. Maria Söderberg' },
  { id: 'slot-004', dateTime: '2026-07-16T09:30:00.000Z', doctor: 'Dr. Erik Lindqvist' },
  { id: 'slot-005', dateTime: '2026-07-18T15:00:00.000Z', doctor: 'Dr. Anna Bergström' },
]

export const ehrProvider = {
  system: SYSTEM,

  fetchAppointments() {
    console.log(`[${SYSTEM}] Fetching appointments for patient`)
    return appointments
  },

  fetchTimeslots() {
    console.log(`[${SYSTEM}] Fetching available timeslots`)
    return timeslots
  },

  getTimeslotById(id) {
    console.log(`[${SYSTEM}] Fetching timeslot ${id}`)
    return timeslots.find((ts) => ts.id === id) ?? null
  },

  reschedule(apptId, slotId, newDateTime) {
    console.log(`[${SYSTEM}] Sending reschedule: appointment ${apptId} → slot ${slotId} (${newDateTime})`)
  },
}
