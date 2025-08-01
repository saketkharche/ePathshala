import React, { useEffect, useState } from 'react';
import {
  getStudents, getTeachers, getParents, addStudent, addTeacher, addParent, assignTeacher,
  getEvents, addEvent, deleteEvent, getDashboardSummary
} from '../../api/admin';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState({});
  const [newStudent, setNewStudent] = useState({ name: '', email: '', password: '', studentClass: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', password: '', subject: '', assignedClass: '' });
  const [newParent, setNewParent] = useState({ name: '', email: '', password: '' });
  const [assign, setAssign] = useState({ email: '', subject: '', assignedClass: '' });
  const [newEvent, setNewEvent] = useState({ eventName: '', date: '', description: '' });

  useEffect(() => {
    getStudents().then(setStudents);
    getTeachers().then(setTeachers);
    getParents().then(setParents);
    getEvents().then(setEvents);
    getDashboardSummary().then(setSummary);
  }, []);

  const handleAddStudent = async e => {
    e.preventDefault();
    await addStudent(newStudent);
    getStudents().then(setStudents);
  };
  const handleAddTeacher = async e => {
    e.preventDefault();
    await addTeacher(newTeacher);
    getTeachers().then(setTeachers);
  };
  const handleAddParent = async e => {
    e.preventDefault();
    await addParent(newParent);
    getParents().then(setParents);
  };
  const handleAssignTeacher = async e => {
    e.preventDefault();
    await assignTeacher(assign);
    getTeachers().then(setTeachers);
  };
  const handleAddEvent = async e => {
    e.preventDefault();
    await addEvent(newEvent);
    getEvents().then(setEvents);
  };
  const handleDeleteEvent = async id => {
    await deleteEvent(id);
    getEvents().then(setEvents);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Summary</h3>
      <ul>
        <li>Students: {summary.students}</li>
        <li>Teachers: {summary.teachers}</li>
        <li>Parents: {summary.parents}</li>
        <li>Events: {summary.events}</li>
      </ul>
      <h3>Add Student</h3>
      <form onSubmit={handleAddStudent}>
        <input placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
        <input placeholder="Email" value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} />
        <input placeholder="Password" type="password" value={newStudent.password} onChange={e => setNewStudent({ ...newStudent, password: e.target.value })} />
        <input placeholder="Class" value={newStudent.studentClass} onChange={e => setNewStudent({ ...newStudent, studentClass: e.target.value })} />
        <button type="submit">Add Student</button>
      </form>
      <h3>Add Teacher</h3>
      <form onSubmit={handleAddTeacher}>
        <input placeholder="Name" value={newTeacher.name} onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })} />
        <input placeholder="Email" value={newTeacher.email} onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })} />
        <input placeholder="Password" type="password" value={newTeacher.password} onChange={e => setNewTeacher({ ...newTeacher, password: e.target.value })} />
        <input placeholder="Subject" value={newTeacher.subject} onChange={e => setNewTeacher({ ...newTeacher, subject: e.target.value })} />
        <input placeholder="Assigned Class" value={newTeacher.assignedClass} onChange={e => setNewTeacher({ ...newTeacher, assignedClass: e.target.value })} />
        <button type="submit">Add Teacher</button>
      </form>
      <h3>Add Parent</h3>
      <form onSubmit={handleAddParent}>
        <input placeholder="Name" value={newParent.name} onChange={e => setNewParent({ ...newParent, name: e.target.value })} />
        <input placeholder="Email" value={newParent.email} onChange={e => setNewParent({ ...newParent, email: e.target.value })} />
        <input placeholder="Password" type="password" value={newParent.password} onChange={e => setNewParent({ ...newParent, password: e.target.value })} />
        <button type="submit">Add Parent</button>
      </form>
      <h3>Assign Teacher to Class/Subject</h3>
      <form onSubmit={handleAssignTeacher}>
        <input placeholder="Teacher Email" value={assign.email} onChange={e => setAssign({ ...assign, email: e.target.value })} />
        <input placeholder="Subject" value={assign.subject} onChange={e => setAssign({ ...assign, subject: e.target.value })} />
        <input placeholder="Assigned Class" value={assign.assignedClass} onChange={e => setAssign({ ...assign, assignedClass: e.target.value })} />
        <button type="submit">Assign</button>
      </form>
      <h3>Academic Calendar</h3>
      <form onSubmit={handleAddEvent}>
        <input placeholder="Event Name" value={newEvent.eventName} onChange={e => setNewEvent({ ...newEvent, eventName: e.target.value })} />
        <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
        <input placeholder="Description" value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>{ev.eventName} ({ev.date}) <button onClick={() => handleDeleteEvent(ev.id)}>Delete</button></li>
        ))}
      </ul>
      <h3>Student List</h3>
      <ul>
        {students.map(s => <li key={s.id}>{s.user?.name || s.name} ({s.studentClass})</li>)}
      </ul>
      <h3>Teacher List</h3>
      <ul>
        {teachers.map(t => <li key={t.id}>{t.user?.name || t.name} ({t.subject}, {t.assignedClass})</li>)}
      </ul>
      <h3>Parent List</h3>
      <ul>
        {parents.map(p => <li key={p.id}>{p.user?.name || p.name}</li>)}
      </ul>
    </div>
  );
}

export default AdminDashboard;