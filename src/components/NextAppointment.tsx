// components/NextAppointment.tsx
import { type Appointment } from '../types';
import './NextAppointment.css';

type NextAppointmentProps = {
  appointment: Appointment;
};

function NextAppointment({ appointment }: NextAppointmentProps) {
  return (
    <section className="next-step-section">
      <h2 className="section-title">NEXT STEP</h2>
      
      <div className="appointment-card">
        <div className="appointment-header">
          <span className="appointment-badge">UPCOMING</span>
          <h3>{appointment.specialty}</h3>
        </div>

        <div className="appointment-details">
          <div className="detail-row">
            <span className="detail-label">Specialist</span>
            <span className="detail-value">{appointment.doctorName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date & time</span>
            <span className="detail-value highlight">
              {appointment.date} - {appointment.time}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Est. cost</span>
            <span className="detail-value">${appointment.estimatedCost}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Medicare rebate</span>
            <span className="detail-value rebate">-${appointment.medicareRebate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Out of pocket</span>
            <span className="detail-value out-of-pocket">~${appointment.outOfPocket}</span>
          </div>
          {appointment.waitTime && (
            <div className="detail-row">
              <span className="detail-label">Wait time</span>
              <span className="detail-value">{appointment.waitTime}</span>
            </div>
          )}
        </div>

        {/* Reminder Box */}
        {appointment.itemsToBring && appointment.itemsToBring.length > 0 && (
          <div className="reminder-box">
            <div className="reminder-icon">📋</div>
            <div className="reminder-content">
              <strong>Bring these to your appointment</strong>
              <ul>
                {appointment.itemsToBring.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NextAppointment;