function SuccessMessage({ data }) {
   return (
      <div className="text-center space-y-6">
         <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M5 13l4 4L19 7"
                  />
               </svg>
            </div>
         </div>

         <h2 className="text-2xl font-bold text-dark">Application Successfully Submitted!</h2>

         <div className="bg-gray-50 rounded-lg p-4 mx-auto max-w-md text-left">
            <p className="mb-2"><span className="font-medium">Name:</span> {data.name}</p>
            <p className="mb-2"><span className="font-medium">Email:</span> {data.email}</p>
            <p className="mb-2"><span className="font-medium">Phone:</span> {data.phone}</p>
         </div>

         <p className="text-gray-600">
            Thanks for your interest in joining our team! We'll review your application and get back to you soon.
         </p>

         <p className="text-gray-600">
            You'll receive a follow-up email within 24 hours confirming that your CV is under review.
         </p>
      </div>
   );
}

export default SuccessMessage;