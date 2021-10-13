export default function filterContacts(contacts, value) {
  return contacts.length > 0
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(value.trim().toLowerCase()),
      )
    : null;
}
