import "./Appointment.css";

export const Appointment = ({
  key,
  appointmentDate,
  serviceName,
  clickFunction,
}) => {
  return (
    <div className="appointmentDesign" key={key}>
      <div>{appointmentDate}</div>
      <div>{serviceName}</div>
      <div onClick={clickFunction} id="deleteAppointment">
        Borrar
      </div>
    </div>
  );
};
