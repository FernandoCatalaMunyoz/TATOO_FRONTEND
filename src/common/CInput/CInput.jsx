import "./CInput.css";

export const CInput = ({
  className,
  type,
  placeHolder,
  name,
  value,
  onChangeFunction,
  onBlurFunction,
}) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeHolder}
      name={name}
      value={value}
      //emit, recibimos la funcion por props que esta en el padre
      onChange={onChangeFunction}
      onBlur={onBlurFunction}
    />
  );
};