import React, { useState } from 'react';
import './ContactUs.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success('Message submitted successfully!');
      setFormData({
        name: '',
        mobile: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } else {
      toast.error('Please fix the errors before submitting.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Top Right Buttons */}
      <div className="top-buttons">
        <Link to="/about" className="small-button">About Us</Link>
        <Link to="/login" className="small-button">Login</Link>
        <Link to="/" className="small-button">← Back to Home</Link>
      </div>

      {/* Header */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out for any queries, suggestions, or support.</p>
      </div>

      {/* Info and Form */}
      <div className="contact-info-form-container">
        {/* Left Side Info */}
        <div className="contact-info">
          <h2>Our Information</h2>
          <p><strong>Address:</strong> 123 Knowledge Park, Pune, Maharashtra, India</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Email:</strong> support@epathshala.com</p>
          <p><strong>Working Hours:</strong> Monday - Friday: 9 AM - 6 PM</p>
          <p>Feel free to contact us during business hours or use the form to send us a message anytime!</p>

          {/* Embedded Google Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3092.359583222614!2d72.8398431!3d18.9353876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1d080348107%3A0x8fc7e5a731eb9eae!2sNationalist%20Congress%20Party%20-%20Sharad%20Pawar!5e1!3m2!1sen!2sin!4v1754451095593!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? 'input-error' : ''}
            />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? 'input-error' : ''}
            />
            {errors.subject && <span className="error-text">{errors.subject}</span>}

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'input-error' : ''}
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;




/*

this code is of saket

import React, { useState } from 'react';

function ContactUs() {
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const handleSubmit = e => {
    e.preventDefault();
    alert('Feedback submitted!');
    setFeedback({ name: '', email: '', message: '' });
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Contact Us</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 300 }}>
          <b>Institute Address</b>
          <p>123 School Road, City, State</p>
          <p>Email: info@epathshala.edu</p>
          <p>Phone: +91-1234567890</p>
        </div>
        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 300 }}>
          <b>Feedback</b>
          <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={feedback.name} onChange={e => setFeedback({ ...feedback, name: e.target.value })} /><br />
            <input placeholder="Email" value={feedback.email} onChange={e => setFeedback({ ...feedback, email: e.target.value })} /><br />
            <textarea placeholder="Message" value={feedback.message} onChange={e => setFeedback({ ...feedback, message: e.target.value })} /><br />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 300 }}>
          <b>Find Us</b>
          <div style={{ width: '100%', height: 180, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Google Map Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

*/