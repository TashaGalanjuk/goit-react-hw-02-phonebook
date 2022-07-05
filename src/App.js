import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmitHandler = ({ name, number }) => {
    const sameContactName = this.state.contacts
      .map(contact => contact.name)
      .includes(name.toLowerCase());

    if (sameContactName) {
      alert(`${name} is already in contacts.`);
    } else {
      const contacts = {
        id: nanoid(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [contacts, ...prevState.contacts],
      }));
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilter = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const completedFilter = this.getFilter();
    return (
      <div>
        <div>
          <h1 className="Title">Phonebook</h1>
          <ContactForm onSubmit={this.onSubmitHandler} />
        </div>
        <h2 className="Title">Contacts</h2>
        <div className="Contacts">
          {this.state.contacts.length > 1 && (
            <Filter value={this.state.filter} onChange={this.changeFilter} />
          )}
          <ContactList
            contacts={completedFilter}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
