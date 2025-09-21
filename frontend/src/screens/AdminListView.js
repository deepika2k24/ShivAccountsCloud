/*import React, { useEffect, useState } from "react";

const AdminListView = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/contacts");
        const data = await res.json();
        console.log("Contacts fetched in React:", data);

        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Users (Admin View)</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Profile Pic</th>
            <th>User Name</th>
            <th>Login ID</th>
            <th>Contact Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Postcode</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>
                {c.profile_pic ? (
                  <img
                    src={`http://localhost:5000/uploads/${c.profile_pic}`}
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                    alt="profile"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{c.user_name}</td>
              <td>{c.login_id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.city}</td>
              <td>{c.state}</td>
              <td>{c.postcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "50px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
};

export default AdminListView;
*/
/*import React, { useEffect, useState } from "react";

const AdminListView = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/contacts");
        const data = await res.json();
        console.log("Contacts fetched in React:", data);

        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Users (Admin View)</h2>

      {contacts.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No contacts found.
        </p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>User Name</th>
              <th>Login ID</th>
              <th>Contact Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>State</th>
              <th>Postcode</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>
                  {c.profile_pic ? (
                    <img
                      src={`http://localhost:5000/uploads/${c.profile_pic}`}
                      width="50"
                      height="50"
                      style={{ borderRadius: "50%" }}
                      alt="profile"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{c.user_name}</td>
                <td>{c.login_id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.city}</td>
                <td>{c.state}</td>
                <td>{c.postcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "50px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
};

export default AdminListView;

*/
import React, { useEffect, useState } from "react";

const AdminListView = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/admin/contacts");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Contacts fetched in React:", data);
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error("API response is not an array:", data);
          setError("Invalid data format received from server");
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  // Debug information component
  const DebugInfo = () => (
    <div style={styles.debug}>
      <h3>Debug Information</h3>
      <p>Loading: {loading ? "Yes" : "No"}</p>
      <p>Error: {error || "None"}</p>
      <p>Contacts count: {contacts.length}</p>
      <button onClick={() => console.log(contacts)}>Log Contacts to Console</button>
    </div>
  );

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>All Users (Admin View)</h2>
        <p style={{ textAlign: "center" }}>Loading contacts...</p>
        <DebugInfo />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>All Users (Admin View)</h2>
        <p style={{ textAlign: "center", color: "red" }}>
          Error: {error}
        </p>
        <p style={{ textAlign: "center" }}>
          Make sure your backend server is running on port 5000
        </p>
        <DebugInfo />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>All Users (Admin View)</h2>
      <DebugInfo />

      {contacts.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No contacts found.
        </p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Profile Pic</th>
                <th>User Name</th>
                <th>Login ID</th>
                <th>Contact Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>State</th>
                <th>Postcode</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id || `${c.email}-${c.name}`}>
                  <td>
                    {c.profile_pic ? (
                      <img
                        src={`http://localhost:5000/uploads/${c.profile_pic}`}
                        width="50"
                        height="50"
                        style={{ borderRadius: "50%" }}
                        alt="profile"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                    ) : (
                      <span>N/A</span>
                    )}
                  </td>
                  <td>{c.user_name || "N/A"}</td>
                  <td>{c.login_id || "N/A"}</td>
                  <td>{c.name || "N/A"}</td>
                  <td>{c.email || "N/A"}</td>
                  <td>{c.phone || "N/A"}</td>
                  <td>{c.city || "N/A"}</td>
                  <td>{c.state || "N/A"}</td>
                  <td>{c.postcode || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  tableContainer: {
    overflowX: "auto",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  debug: {
    margin: "20px 0",
    padding: "15px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    border: "1px solid #ddd",
  }
};

// Add error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h2>Something went wrong with the Admin View.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap your component with the error boundary
export default function AdminListWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <AdminListView />
    </ErrorBoundary>
  );
}