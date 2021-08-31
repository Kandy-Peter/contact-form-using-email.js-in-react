import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isEmail = () =>{
    let mail = document.getElementById('not-mail');
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      //how to test a regex
    if(email.match(regex)) {
      mail.style.display = "none";
      return true;
    }
    else{
      mail.style.display = 'block';
      mail.style.animation = 'dongle 1s';
      setTimeout(() =>{
        mail.style.animation = "none";
      }, 1000);
      return false;
    }
  }

  const faillMessage = () =>{
      let formMessage = document.querySelector('.form-message');

      formMessage.innerHTML = "thanks to fill all inputs correctly";
      formMessage.style.opacity = '1';
      formMessage.style.color = 'red';

      document.getElementById('name').classList.add('error');
      document.getElementById('email').classList.add('error');
      document.getElementById('message').classList.add('error');
  }

  const successMessage = () => {
    let formMessage = document.querySelector('.form-message');

      formMessage.innerHTML = "message sent successfuly !";
      formMessage.style.opacity = '1';
      formMessage.style.background ="none";
      formMessage.style.color = 'green';

      document.getElementById('name').classList.remove('error');
      document.getElementById('email').classList.remove('error');
      document.getElementById('message').classList.remove('error');

      setTimeout(() => {
        formMessage.style.opacity ="0";
      }, 5000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

      if(name && isEmail() && message){
      //the tempalte id created form email.js
        sendFeedback("template_lgxhn2c", {
          // the stricture is equal to:"name:name,"
          name,
          company,
          phone,
          email,
          message,
        });
      }
      else{
        faillMessage();
      }
  };

  const sendFeedback = (templateId, variables) => {

    window.emailjs
      .send("service_wchosc7", templateId, variables)
      .then((res) => {
        successMessage();
        setName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setMessage("");
      })
      .catch(
        (err) =>
          document.querySelector('.form-message').innerHTML =
            "Error, please retry.");
  };

  return (
    <form className="contact-form">
      <h2>Contactez-nous</h2>
      <div className="form-content">
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="nom *"
          value={name}
          autoComplete="off"
        />
        <input
          type="text"
          id="company"
          name="company"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="société"
          value={company}
        />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="téléphone"
          value={phone}
        />
        <div className="email-content">
          <label id="not-mail">Email non valide</label>
          <input
            type="mail"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email *"
            value={email}
            autoComplete="off"
          />
        </div>
        <textarea
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="message *"
          value={message}
        />
      </div>
      <input
        className="button"
        type="button"
        value="Envoyer"
        onClick={handleSubmit}
      />
      <div className="form-message"></div>
      <span>@Kandy Peter Kamuntu</span>
    </form>
  );
};

export default App;
