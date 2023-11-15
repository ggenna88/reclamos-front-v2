import Form from "react-bootstrap/Form";

function OptionSelectDropdown({
  listOption,
  userForm,
  setUserForm,
  tipoPersona,
}) {
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
    console.log(userForm);
  };
  return (
    <Form.Select
      onChange={onInputChange}
      name="tipoPersona"
      value={tipoPersona}
      aria-label="Default select example"
      className="my-3 w-75"
    >
      <option>Tipo de persona....</option>
      {listOption.map((option, index) => (
        <option key={index} value={index}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}

export default OptionSelectDropdown;
