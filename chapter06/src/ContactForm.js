import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import './ContactForm.css'; // Import the CSS file

//OUTLINE
// Name Input: A text input for the user's name with validation.
// Email Input: An email input with validation.
// Message Text Area: A text area for the user to enter a message.
// Checkbox: An option for the user to subscribe to a newsletter.
// Radio Buttons: Options for the user to select their gender.
// Submission Handling: Alerts the user with the entered information upon form submission and clears the form.

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [gender, setGender] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let nameValid = false;
    let emailValid = false;

    // Name validation
    if (name.length === 0) {
      setNameError("Name is required");
    } else {
      setNameError("");
      nameValid = true;
    }

    // Email validation
    if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email must be at least 6 characters long");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else {
      setEmailError("");
      emailValid = true;
    }

    // Submit if valid
    if (nameValid && emailValid) {
      alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSubscribe: ${subscribe}\nGender: ${gender}`);
      setName("");
      setEmail("");
      setMessage("");
      setSubscribe(false);
      setGender("");
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {nameError.length > 0 && <Alert variant="danger">{nameError}</Alert>}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {emailError.length < 8 && <Alert variant="danger">{emailError}</Alert>}
        </Form.Group>

        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Subscribe to our newsletter"
            checked={subscribe}
            onChange={(e) => setSubscribe(e.target.checked)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              id="genderMale"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              id="genderFemale"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ContactForm;