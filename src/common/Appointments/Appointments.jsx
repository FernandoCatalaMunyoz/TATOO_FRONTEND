import "./Appointments.css";

export const Appointment = ({
  id,
  appointmentDate,
  appointmentTime,
  service,
  clickFunction,
}) => {
  return (
    <div appointmentDesign>
      <div className="appointmentDesign">{id}</div>
      <div className="appointmentDesign">{appointmentDate}</div>
      <div className="appointmentDesign">{appointmentTime}</div>
      <div className="appointmentDesign">{service}</div>
      <div className="appointmentDesign" onClick={clickFunction}>
        Borrar
      </div>
    </div>
  );
};
