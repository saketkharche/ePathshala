import React from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: "Anushree Upadhye",
    qualification: "PG-DAC",
    phone: "+91 93569 39070",
    email: "anushreeu3@gmail.com",
    address: "Pune, Maharashtra",
    image: "/images/anushree.jpg" // Replace with actual image paths
  },
  {
    name: "Gurav Ahirrao",
    qualification: "PG-DAC",
    phone: "+91 755 841 1157",
    email: "gauravahirrao20@gmail.com",
    address: "Nashik, Maharashtra",
    image: "/images/gaurav.jpg"
  },
  {
    name: "Ravi Yadav",
    qualification: "PG-DAC",
    phone: "+91 98117 32273",
    email: "priya@email.com",
    address: "Delhi, Delhi",
    image: "/images/ravi.jpg"
  },
  {
    name: "Saket Kharche",
    qualification: "PG-DAC",
    phone: "+91 95030 27747",
    email: "saketkharche1@gmail.com",
    address: "Buldhana, Maharashtra",
    image: "/images/saket.jpg"
  },
  {
    name: "Satyajeet Khamkar",
    qualification: "PG-DAC",
    phone: "+91 73787 50403",
    email: "khamkarsatyajeet190401@gmail.com",
    address: "Kolhapur, Maharashtra",
    image: "/images/satyajeet.jpg"
  }
];

const AboutUs = () => {
  return (
    <div className="about-container">

       {/* Buttons at top-right */}
      <div className="top-buttons">
        <Link to="/contact" className="small-button">Contact Us</Link>
        <Link to="/login" className="small-button">Login</Link>
        <Link to="/" className="small-button">← Back to Home</Link>
      </div>

      <h1>Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="card" key={index}>
            <img src={member.image} alt={member.name} />
            <div className="card-info">
              <h2>{member.name}</h2>
              <p><strong>Qualification:</strong> {member.qualification}</p>
              <p><strong>Phone:</strong> {member.phone}</p>
              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>Address:</strong> {member.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;



// import React, { useState } from 'react';

// const features = [
//   'Centralized academic and administrative management',
//   'Role-based dashboards for Admin, Teacher, Student, Parent',
//   'Attendance, grades, assignments, leave, and calendar workflows',
//   'Secure JWT authentication and role-based access',
//   'Modern, responsive web interface for all users'
// ];

// const team = [
//   { name: 'Alice', role: 'Lead Developer', photo: '' },
//   { name: 'Bob', role: 'Backend Engineer', photo: '' },
//   { name: 'Carol', role: 'Frontend Engineer', photo: '' },
//   { name: 'Dave', role: 'UI/UX Designer', photo: '' }
// ];

// function AboutUs() {
//   const [showTeam, setShowTeam] = useState(false);
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>About ePathshala</h2>
//       <div style={{ display: 'flex', gap: 20 }}>
//         {features.map((f, i) => (
//           <div key={i} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 200 }}>
//             <b>Feature {i + 1}</b>
//             <p>{f}</p>
//           </div>
//         ))}
//         <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 200, cursor: 'pointer' }} onClick={() => setShowTeam(true)}>
//           <b>Know Our Team</b>
//         </div>
//       </div>
//       {showTeam && (
//         <div style={{ position: 'fixed', top: 100, left: '50%', transform: 'translateX(-50%)', background: '#fff', border: '1px solid #888', borderRadius: 8, padding: 24, zIndex: 1000 }}>
//           <h3>Our Team</h3>
//           <div style={{ display: 'flex', gap: 20 }}>
//             {team.map((m, i) => (
//               <div key={i} style={{ textAlign: 'center' }}>
//                 <div style={{ width: 80, height: 80, background: '#eee', borderRadius: '50%', margin: 'auto' }}>{m.photo ? <img src={m.photo} alt={m.name} style={{ width: '100%', borderRadius: '50%' }} /> : m.name[0]}</div>
//                 <div>{m.name}</div>
//                 <div style={{ fontSize: 12, color: '#888' }}>{m.role}</div>
//               </div>
//             ))}
//           </div>
//           <button onClick={() => setShowTeam(false)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AboutUs;