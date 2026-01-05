import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { loginUser } from '../../services/UserService';
import { UserContext } from '../../contexts/UserContext';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (formData.password.length > 25) {
      newErrors.password = 'Password must be at most 25 characters long';
    } else if (!/(?=.*[0-9])(?=.*[A-Z])(?=.*[\W_])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one number, and one special character';
    }

    return newErrors;
  };

const { setUser } = useContext(UserContext); // Access setUser from UserContext

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();

  if (Object.keys(validationErrors).length === 0) {
    try {
      const data = await loginUser(formData);
      
      // Set the user in the context to trigger re-render
      setUser(data); // <-- This triggers re-render across all components using UserContext

      localStorage.setItem('user', JSON.stringify(data)); // Optionally store user in localStorage
      
      // Redirect based on user role
      if (data.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/events');
      }
      setLoginError(''); // Clear any existing login errors
    } catch (err) {
      console.log(err);
      setLoginError('Incorrect email or password.'); // Set login error
    }

    setFormData({
      email: '',
      password: '',
    });
  } else {
    setErrors(validationErrors);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="max-w-md w-full p-5 border border-gray-300 rounded-md bg-purple-200 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-5">EventFinder Sign In</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full font-medium bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Sign In
            </button>
          </div>
        </form>
        {loginError && (
          <div className="text-red-500 text-center mt-4">
            {loginError}
          </div>
        )}

        <div className="mt-4 text-center">
        <p className="text-gray-600">
            don't remember your password?{' '}
            <NavLink to="/forgot-password" className="text-orange-500 font-medium hover:underline">
              forgot password
            </NavLink>
          </p>
          <p className="text-gray-600">
            New user?{' '}
            <NavLink to="/signup" className="text-orange-500 font-medium hover:underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
