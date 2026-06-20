import express from 'express'
import cors from 'cors'
import { encodeRef, decodeRef, getProvider, getAllProviders } from './registry.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/appointments', (req, res) => {
  const appointments = getAllProviders().flatMap((provider) =>
    provider.fetchAppointments().map(({ id, ...a }) => ({ ...a, externalReference: encodeRef(provider.system, id) }))
  )
  res.json(appointments)
})

app.get('/api/timeslots', (req, res) => {
  const timeslots = getAllProviders().flatMap((provider) =>
    provider.fetchTimeslots().map(({ id, ...ts }) => ({ ...ts, externalReference: encodeRef(provider.system, id) }))
  )
  res.json(timeslots)
})

app.get('/api/timeslots/:externalReference', (req, res) => {
  const { system, id } = decodeRef(req.params.externalReference)
  const provider = getProvider(system)
  const timeslot = provider.getTimeslotById(id)
  if (!timeslot) return res.status(404).json({ error: 'Timeslot not found' })
  const { id: _id, ...timeslotData } = timeslot
  res.json({ ...timeslotData, externalReference: encodeRef(system, id) })
})

app.post('/api/appointments/:externalReference/reschedule', (req, res) => {
  const { system: apptSystem, id: apptId } = decodeRef(req.params.externalReference)
  const { externalReference: slotEncoded } = req.body

  if (!slotEncoded) return res.status(400).json({ error: 'externalReference is required' })

  const { system: slotSystem, id: slotId } = decodeRef(slotEncoded)
  const provider = getProvider(apptSystem)
  const timeslot = provider.getTimeslotById(slotId)
  if (!timeslot) return res.status(404).json({ error: 'Timeslot not found' })

  console.log(`[Business Logic] Rescheduling appointment ${apptSystem}:${apptId} to ${timeslot.dateTime}`)
  provider.reschedule(apptId, slotId, timeslot.dateTime)
  console.log(`[Business Logic] Request sent to care unit for appointment ${apptSystem}:${apptId}`)

  res.json({ success: true, newDateTime: timeslot.dateTime })
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
