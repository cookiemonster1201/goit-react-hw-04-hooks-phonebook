import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Container from 'components/Container';
import ContactsForm from 'components/ContactsForm';
import ContactsList from 'components/ContactsList';
import { Filter } from 'components/Filter';
import filterContacts from 'utils/filter-contacts';
import useLocalStorage from 'hooks/useLocalStorage';

const H1 = styled.h1`
  margin-bottom: 40px;
  font-size: 50px;
  text-align: center;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
`;

const H2 = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 40px;
  text-shadow: 4px 3px 0px #fff, 9px 8px 0px rgba(0, 0, 0, 0.15);
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const handleContactAdd = (name, number) => {
    const isContactExisting = contacts.some(
      contact => contact.name === name || contact.number === number,
    );
    if (isContactExisting) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevState => [
      ...prevState,
      {
        id: uuidv4(),
        name,
        number,
      },
    ]);
  };

  const handleContactDelete = contactNumber => {
    setContacts(prevState => {
      const newState = prevState.filter(
        contact => contactNumber !== contact.number,
      );
      return [...newState];
    });
    setFilter('');
  };

  const filteredContacts = filterContacts(contacts, filter);

  return (
    <Container>
      <H1>Phonebook</H1>
      <ContactsForm onSubmit={handleContactAdd} />
      <Div>
        <H2>Contacts</H2>
        <Filter
          value={filter}
          onChange={({ currentTarget: { value } }) => {
            setFilter(value);
          }}
        />
        {filteredContacts && (
          <ContactsList
            contacts={filteredContacts}
            onClick={handleContactDelete}
          />
        )}
      </Div>
    </Container>
  );
}

export default App;
