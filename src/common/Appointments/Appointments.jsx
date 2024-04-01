import "./Appointment.css";

export const Appointment = ({ key, appointmentDate, service }) => {
  return (
    <div appointmentDesign className="appointmentDesign" key={key}>
      <div className="appointmentDesign">{appointmentDate}</div>

      <div className="appointmentDesign">{service}</div>
    </div>
  );
};
