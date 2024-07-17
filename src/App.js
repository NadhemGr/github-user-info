import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserInformation from './UserInformation/UserInformation';

const queryClient = new QueryClient();

function App() {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUsername(username);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>GitHub User Information</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
          <button type="submit">Search</button>
        </form>
        {submittedUsername && <UserInformation username={submittedUsername} />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
 