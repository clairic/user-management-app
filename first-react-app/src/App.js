import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Sample initial data (you can remove this when you connect your new backend)
  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1-555-0123', created_at: '2025-10-15T10:00:00Z' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1-555-0456', created_at: '2025-10-15T10:01:00Z' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1-555-0789', created_at: '2025-10-15T10:02:00Z' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', phone: '+1-555-0321', created_at: '2025-10-15T10:03:00Z' },
  ]

  // Load users from localStorage or use initial data
  const loadUsers = () => {
    setLoading(true)
    setError(null)
    try {
      const savedUsers = localStorage.getItem('users')
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers)
        setUsers(parsedUsers)
        console.log('✅ Loaded users from localStorage:', parsedUsers.length)
      } else {
        // First time - use initial data
        setUsers(initialUsers)
        localStorage.setItem('users', JSON.stringify(initialUsers))
        console.log('✅ Initialized with sample data:', initialUsers.length)
      }
    } catch (err) {
      setError('Failed to load users from local storage')
      console.error('❌ Load error:', err)
      setUsers(initialUsers) // Fallback to initial data
    } finally {
      setLoading(false)
    }
  }

  // Save users to localStorage whenever users change
  const saveUsers = (updatedUsers) => {
    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
    } catch (err) {
      setError('Failed to save users to local storage')
      console.error('❌ Save error:', err)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const addUser = () => {
    if (newUser.name.trim() !== '' && newUser.email.trim() !== '' && newUser.phone.trim() !== '') {
      // Check for duplicate email
      const emailExists = users.some(user => user.email.toLowerCase() === newUser.email.toLowerCase())
      if (emailExists) {
        setError('Email already exists')
        return
      }

      try {
        const userToAdd = {
          id: Date.now(), // Simple ID generation
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          created_at: new Date().toISOString()
        }
        
        const updatedUsers = [...users, userToAdd]
        saveUsers(updatedUsers)
        
        console.log('✅ User added to localStorage:', userToAdd)
        
        // Reset form
        setNewUser({ name: '', email: '', phone: '' })
        setError(null)
        
      } catch (err) {
        setError('Failed to add user')
        console.error('❌ Add user error:', err)
      }
    } else {
      setError('Please fill in all fields')
    }
  }

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const updatedUsers = users.filter(user => user.id !== userId)
        saveUsers(updatedUsers)
        
        console.log('🗑️ User deleted from localStorage')
        setError(null)
        
      } catch (err) {
        setError('Failed to delete user')
        console.error('❌ Delete error:', err)
      }
    }
  }

  const handleInputChange = (field, value) => {
    setNewUser(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Modern styles object
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      color: '#2c3e50',
      fontSize: '2.5rem',
      fontWeight: '300',
      letterSpacing: '2px'
    },
    formCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      padding: '30px',
      marginBottom: '40px',
      border: '1px solid #e9ecef',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
    },
    formTitle: {
      color: '#495057',
      marginBottom: '25px',
      fontSize: '1.4rem',
      fontWeight: '500'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      alignItems: 'end'
    },
    input: {
      padding: '12px 16px',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    buttonHover: {
      backgroundColor: '#5a6fd8',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)'
    },
    tableContainer: {
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
      backgroundColor: 'white'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    },
    tableHeader: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '20px 15px',
      textAlign: 'left',
      fontWeight: '500',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    },
    tableCell: {
      padding: '18px 15px',
      borderBottom: '1px solid #e9ecef',
      color: '#495057'
    },
    tableRow: {
      transition: 'background-color 0.2s ease'
    },
    tableRowHover: {
      backgroundColor: '#f8f9fa'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      flexDirection: 'column'
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      marginTop: '20px',
      color: '#495057',
      fontSize: '18px'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <div style={styles.loadingText}>Loading users...</div>
          </div>
        ) : (
          <>
            <h1 style={styles.header}>👥 User Management (Local Storage)</h1>
            
            {/* Error Display */}
            {error && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid #f5c6cb'
              }}>
                ⚠️ {error}
              </div>
            )}
            
            {/* Modern Add User Form */}
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>✨ Add New User</h3>
              <div style={styles.formGrid}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newUser.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <button 
                  onClick={addUser}
                  style={styles.button}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#5a6fd8'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#667eea'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Add User
                </button>
              </div>
            </div>

            {/* Modern Table */}
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>👤 Name</th>
                    <th style={styles.tableHeader}>📧 Email</th>
                    <th style={styles.tableHeader}>📱 Phone</th>
                    <th style={styles.tableHeader}>🛠️ Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr 
                      key={user.id}
                      style={styles.tableRow}
                      onMouseEnter={(e) => e.target.parentNode.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.parentNode.style.backgroundColor = 'white'}
                    >
                      <td style={styles.tableCell}>{user.name}</td>
                      <td style={styles.tableCell}>{user.email}</td>
                      <td style={styles.tableCell}>{user.phone}</td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => deleteUser(user.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
