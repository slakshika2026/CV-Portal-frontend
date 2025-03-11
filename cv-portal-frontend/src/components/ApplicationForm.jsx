import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function ApplicationForm({ onSubmitSuccess }) {
   const { register, handleSubmit, formState: { errors } } = useForm();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [fileError, setFileError] = useState('');

   const onSubmit = async (data) => {
      try {
         setIsSubmitting(true);
         setFileError('');

         if (!data.cv || data.cv.length === 0) {
            setFileError('Please upload your CV');
            setIsSubmitting(false);
            return;
         }

         const file = data.cv[0];
         const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

         if (!allowedTypes.includes(file.type)) {
            setFileError('Please upload a PDF or DOCX file');
            setIsSubmitting(false);
            return;
         }

         const formData = new FormData();
         formData.append('name', data.name);
         formData.append('email', data.email);
         formData.append('phone', data.phone);
         formData.append('cv', file);

         const response = await axios.post(`${API_URL}/submit-application`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });

         if (response.data.success) {
            onSubmitSuccess({
               name: data.name,
               email: data.email,
               phone: data.phone,
               cvLink: response.data.cvLink
            });
         }
      } catch (error) {
         console.error('Error submitting application:', error);
         alert('An error occurred while submitting your application. Please try again.');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
               {...register('name', { required: 'Name is required' })}
               type="text"
               className="form-input"
               placeholder="John Doe"
            />
            {errors.name && (
               <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
         </div>

         <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
               {...register('email', {
                  required: 'Email is required',
                  pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: 'Invalid email address'
                  }
               })}
               type="email"
               className="form-input"
               placeholder="john.doe@example.com"
            />
            {errors.email && (
               <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
         </div>

         <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
               {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                     value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                     message: 'Invalid phone number'
                  }
               })}
               type="tel"
               className="form-input"
               placeholder="+94 (123) 456-7890"
            />
            {errors.phone && (
               <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
         </div>

         <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">CV Upload (PDF or DOCX)</label>
            <input
               {...register('cv')}
               type="file"
               accept=".pdf,.docx"
               className="form-input p-1.5"
            />
            {fileError && (
               <p className="text-red-500 text-xs">{fileError}</p>
            )}
            <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
         </div>

         <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
         >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
         </button>
      </form>
   );
}

export default ApplicationForm;