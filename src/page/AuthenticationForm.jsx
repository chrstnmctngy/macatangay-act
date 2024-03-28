import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthenticationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return false;
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setPasswordError('Password must contain at least one letter and one number.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!checkPasswordStrength(password)) {
      isValid = false;
    }

    if (isValid) {
      console.log('Form is valid');
      navigate('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto my-10">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {emailError && <small className="text-red-500">{emailError}</small>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {passwordError && <small className="text-red-500">{passwordError}</small>}
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button>
    </form>
  );
}

export default AuthenticationForm;
