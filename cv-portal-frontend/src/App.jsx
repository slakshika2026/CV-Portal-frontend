import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplicationForm from './components/ApplicationForm';
import SuccessMessage from './components/SuccessMessage';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [applicationData, setApplicationData] = useState(null);

  const handleSubmitSuccess = (data) => {
    setApplicationData(data);
    setSubmitted(true);
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-center text-dark mb-2">Job Application Portal</h1>
        <p className="text-gray-600 text-center mb-8">Please fill out the form below to apply</p>

        {!submitted ? (
          <ApplicationForm onSubmitSuccess={handleSubmitSuccess} />
        ) : (
          <SuccessMessage data={applicationData} />
        )}
      </div>
      <footer className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Metana. All rights reserved.
      </footer>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;