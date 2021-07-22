import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import ContactCard from './ContactCard';

const ContactList = (props) => {
  const inputEl = useRef('');

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div className="ui main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contact"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon" />
        </div>
      </div>

      {props.loading && <Loader />}

      {renderContactList.length ? (
        <div className="ui celled list">{renderContactList}</div>
      ) : props.loading ? null : (
        <div className="center-div">
          <h3 className="label">No Contacts...</h3>
        </div>
      )}
    </div>
  );
};

export default ContactList;
