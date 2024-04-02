import "./Appointment.css";

export const Appointment = ({
  key,
  appointmentDate,
  service,
  clickFunction,
}) => {
  return (
    <div className="appointmentDesign" key={key}>
      <div>{appointmentDate}</div>

      <div>{service}</div>
      <div onClick={clickFunction} id="deleteAppointment">
        Borrar
      </div>
    </div>
  );
};
