import "./Appointment.css";

export const Appointment = ({ key, appointmentDate, service }) => {
  return (
    <div className="appointmentDesign" key={key}>
      <div>{appointmentDate}</div>

      <div>{service}</div>
    </div>
  );
};
