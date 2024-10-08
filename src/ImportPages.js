// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ImportPage = ({ type }) => {
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would handle the file upload and processing
//     console.log(`Importing from ${type}:`, file);
//     // After processing, navigate back to the main page
//     navigate('/');
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Import from {type}</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
//             Select {type} file
//           </label>
//           <input
//             type="file"
//             id="file"
//             onChange={handleFileChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             accept={type === 'Resume' ? '.pdf,.doc,.docx' : '.csv,.xlsx'}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Import
//         </button>
//       </form>
//     </div>
//   );
// };

// export const ImportResume = () => <ImportPage type="Resume" />;
// export const ImportSpreadsheet = () => <ImportPage type="Spreadsheet" />;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './utils/Navbar';
import axiosInstance from './utils/axiosInstance';

const ImportPage = ({ type }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Change the URL to your backend upload endpoint
      // const response = await axios.post('http://localhost:8000/api/upload/', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      const response = await axiosInstance.post('upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Additional header for file upload
        },
      });

      console.log('Upload successful:', response.data);
      // Optionally handle response data, e.g., show a success message or navigate
      navigate('/');
    } catch (error) {
      console.error('Error uploading the file:', error);
      setError('Failed to upload the file. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Import from {type}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Select {type} file
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept={type === 'Resume' ? '.pdf,.doc,.docx' : '.csv,.xlsx'}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Import
        </button>
      </form>
    </div>
    </>
  );
};

export const ImportResume = () => <ImportPage type="Resume" />;
export const ImportSpreadsheet = () => <ImportPage type="Spreadsheet" />;