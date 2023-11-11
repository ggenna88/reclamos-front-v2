import Form from "react-bootstrap/Form";

function OptionSelectDropdown({ listOption }) {
  return (
    <Form.Select aria-label="Default select example" className="my-3 w-75">
      <option>Seleccionar...</option>
      {listOption.map((option) => (
        <option value="1">{option}</option>
      ))}
    </Form.Select>
  );
}

export default OptionSelectDropdown;
