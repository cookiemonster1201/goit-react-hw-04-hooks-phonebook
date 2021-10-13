import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Label } from 'components/Filter';
import { Button } from 'components/ContactsListItem';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 30px 90px;
  border: 2px solid grey;
  border-radius: 30px;
  background: wheat;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const GreenButton = styled(Button)`
  background-color: #113f11;
  margin: 0 auto;
  margin-top: 10px;
  width: 150px;
  &:hover,
  &:focus {
    color: #006900;
  }
`;

function ContactsForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleStateChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const resetFields = () => {
    setNumber('');
    setName('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    resetFields();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          onChange={handleStateChange}
          value={name}
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          onChange={handleStateChange}
          value={number}
          required
        />
      </Label>
      <GreenButton type="submit">Add contact</GreenButton>
    </Form>
  );
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactsForm;
