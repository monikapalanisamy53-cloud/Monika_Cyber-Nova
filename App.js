import React, { useState } from 'react';

// Sample initial data for leave history
const initialLeaveRequests = [
  { id: 1, employeeName: 'Vijay', leaveType: 'Sick Leave', startDate: '2026-06-01', endDate: '2026-06-02', status: 'Approved' },
  { id: 2, employeeName: 'Ajith', leaveType: 'Casual Leave', startDate: '2026-06-10', endDate: '2026-06-12', status: 'Pending' },
  { id: 3, employeeName: 'Vijay', leaveType: 'Loss of Pay', startDate: '2026-06-15', endDate: '2026-06-15', status: 'Rejected' },
];

export default function LeaveManager() {
  const [requests, setRequests] = useState(initialLeaveRequests);
  const [filterEmployee, setFilterEmployee] = useState('');
  
  // Form State
  const [form, setForm] = useState({
    employeeName: '',
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: ''
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit New Leave Request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.employeeName || !form.startDate || !form.endDate) {
      alert('Please fill all the fields!');
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...form,
      status: 'Pending' // Default status
    };

    setRequests([newRequest, ...requests]);
    // Reset Form
    setForm({ employeeName: '', leaveType: 'Casual Leave', startDate: '', endDate: '' });
  };

  // Update Leave Status (Approve / Reject)
  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  // Filter Logic
  const filteredRequests = requests.filter(req => 
    req.employeeName.toLowerCase().includes(filterEmployee.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📋 HR Employee Leave Management Tool</h2>
      
      <div style={styles.grid}>
        {/* SECTION 1: APPLY LEAVE FORM */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>New Leave Request</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Employee Name</label>
            <input 
              type="text" 
              name="employeeName" 
              value={form.employeeName} 
              onChange={handleInputChange} 
              placeholder="Enter name"
              style={styles.input} 
            />

            <label style={styles.label}>Leave Type</label>
            <select name="leaveType" value={form.leaveType} onChange={handleInputChange} style={styles.input}>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Loss of Pay">Loss of Pay</option>
            </select>

            <label style={styles.label}>Start Date</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleInputChange} style={styles.input} />

            <label style={styles.label}>End Date</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleInputChange} style={styles.input} />

            <button type="submit" style={styles.submitBtn}>Submit Request</button>
          </form>
        </div>

        {/* SECTION 2: LEAVE HISTORY & MANAGEMENT */}
        <div style={styles.cardLarge}>
          <div style={styles.headerRow}>
            <h3 style={styles.cardTitle}>Leave History & Requests</h3>
            {/* FILTER INPUT */}
            <input 
              type="text" 
              placeholder="🔍 Filter by Employee Name..." 
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              style={styles.filterInput}
            />
          </div>

          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Employee</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Duration</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(req => (
                  <tr key={req.id} style={styles.tr}>
                    <td style={styles.td}><strong>{req.employeeName}</strong></td>
                    <td style={styles.td}>{req.leaveType}</td>
                    <td style={styles.td}>{req.startDate} to {req.endDate}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge, 
                        backgroundColor: req.status === 'Approved' ? '#d4edda' : req.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                        color: req.status === 'Approved' ? '#155724' : req.status === 'Rejected' ? '#721c24' : '#856404'
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {req.status === 'Pending' ? (
                        <>
                          <button onClick={() => handleStatusChange(req.id, 'Approved')} style={styles.approveBtn}>Approve</button>
                          <button onClick={() => handleStatusChange(req.id, 'Rejected')} style={styles.rejectBtn}>Reject</button>
                        </>
                      ) : (
                        <span style={{ color: '#888', fontSize: '12px' }}>Action Taken</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{...styles.td, textAlign: 'center', color: '#888'}}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Inline Styles for Quick & Clean UI
const styles = {
  container: { padding: '30px', fontFamily: '"Segoe UI", Roboto, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' },
  title: { textAlign: 'center', marginBottom: '30px', color: '#333' },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: { flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  cardLarge: { flex: '2', minWidth: '500px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  cardTitle: { margin: '0 0 20px 0', color: '#444', borderBottom: '2px solid #eee', paddingBottom: '10px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { fontWeight: 'bold', fontSize: '14px', color: '#555' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' },
  submitBtn: { padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px' },
  filterInput: { padding: '8px 15px', borderRadius: '20px', border: '1px solid #ccc', width: '250px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  thRow: { backgroundColor: '#f8f9fa', textAlign: 'left' },
  th: { padding: '12px', borderBottom: '2px solid #dee2e6', color: '#555' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '12px', verticalAlign: 'middle' },
  badge: { padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' },
  approveBtn: { padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' },
  rejectBtn: { padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};