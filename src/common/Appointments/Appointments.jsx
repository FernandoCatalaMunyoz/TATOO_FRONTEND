import "./Appointment.css";

export const Appointment = ({
  appointmentDate,
  serviceName,
  clickFunction,
}) => {
  return (
    <div className="appointmentDesign">
      <div>{appointmentDate}</div>
      <div>{serviceName}</div>
      <div onClick={clickFunction} id="deleteAppointment">
        Borrar
      </div>
    </div>
  );
};
