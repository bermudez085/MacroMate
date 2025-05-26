import React, { useState } from 'react';
import '../Contact.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      <Container className="contact-content">
        <Row className="w-100">
          <Col md={6} sm={12} className="form-col">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              <textarea 
                name="message" 
                placeholder="Your Message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              ></textarea>
              <Button type="submit" className="submit-button">Send Message</Button>
            </form>
          </Col>

          <Col md={6} sm={12} className="info-col">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Email: support@macromate.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Macro St, Nutrition City, USA</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
