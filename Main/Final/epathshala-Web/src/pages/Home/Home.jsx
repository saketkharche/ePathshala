import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // external CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to ePathshala (Student ERP System)</h1>
        <p>Empowering Institutions. Enabling Students. Engaging Parents.</p>
      </header>

      <section className="home-content">
        <h2>What is ePathshala (Student ERP System)?</h2>
        <p>
          Our ERP system is a centralized platform that helps manage student, teacher,
          parent, and admin activities in a seamless way. From assignments to attendance,
          everything is just a click away.
        </p>
      </section>

      <section className="home-buttons">
        <Link to="/about" className="home-button">About Us</Link>
        <Link to="/contact" className="home-button">Contact Us</Link>
        <Link to="/login" className="home-button primary">Login</Link>
      </section>

      <footer className="home-footer">
        <p>© 2025 ePathshala (Student ERP Project). All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.container}>
//       <div style={styles.contentBox}>
//         <h1 style={styles.heading}>Welcome to Student ERP System</h1>
//         <p style={styles.description}>
//           This centralized platform helps manage academic and administrative tasks efficiently.
//           Students, Teachers, Admins, and Parents can interact seamlessly using their respective dashboards.
//         </p>

//         <div style={styles.buttonContainer}>
//           <button style={styles.button} onClick={() => navigate('/about')}>About Us</button>
//           <button style={styles.button} onClick={() => navigate('/contact')}>Contact Us</button>
//           <button style={styles.button} onClick={() => navigate('/login')}>Login</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: '#932F67', // Dominant color
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '20px',
//   },
//   contentBox: {
//     backgroundColor: '#DDDEAB', // Light background for contrast
//     padding: '40px',
//     borderRadius: '16px',
//     boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
//     maxWidth: '700px',
//     width: '100%',
//     textAlign: 'center',
//   },
//   heading: {
//     color: '#932F67', // Primary color again for heading
//     fontSize: '2.5rem',
//     marginBottom: '20px',
//   },
//   description: {
//     color: '#333',
//     fontSize: '1.1rem',
//     marginBottom: '30px',
//   },
//   buttonContainer: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     flexWrap: 'wrap',
//     gap: '15px',
//   },
//   button: {
//     backgroundColor: '#932F67', // Button background
//     color: '#DDDEAB',
//     border: 'none',
//     borderRadius: '8px',
//     padding: '12px 24px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     transition: '0.3s',
//   },
//   buttonHover: {
//     backgroundColor: '#8ABB6C', // Least-used accent color on hover
//   },
// };

// export default Home;
