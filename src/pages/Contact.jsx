import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <h2>Contact Details</h2>
              <ul className="contact-list">
                <li><span className="label">Team:</span> Sathvika and Team</li>
                <li><span className="label">Phone:</span> <a href="tel:+918688201169">+91 86882 01169</a></li>
                <li><span className="label">Email:</span> <a href="mailto:nareshsowdala07@gmail.com">nareshsowdala07@gmail.com</a></li>
              </ul>
            </div>

            <div className="contact-card">
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Your Email</label>
                  <input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Write your message..." rows={5} required />
                </div>
                <button className="btn btn-primary" type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;


