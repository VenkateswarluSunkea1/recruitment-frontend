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

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './utils/Navbar';
// import axiosInstance from './utils/axiosInstance';

// const ImportPage = ({ type }) => {
//   const [file, setFile] = useState(null);
//   const [files, setFiles] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setFiles([...e.target.files]);
//   };
//   console.log(files,'filesefaadasdasd');
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset any previous errors

//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     if (files.length === 0) {
//       setError('Please select files to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);
//     files.forEach((file) => {
//       formData.append('files', file); // Append each file to the form data
//     });
//     console.log(formData,'formDatasfeweewewwe');

//     try {
//       // Change the URL to your backend upload endpoint
//       // const response = await axios.post('http://localhost:8000/api/upload/', formData, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data',
//       //   },
//       // });
//       const response = await axiosInstance.post('upload/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',  // Additional header for file upload
//         },
//       });

//       console.log('Upload successful:', response.data);
//       // Optionally handle response data, e.g., show a success message or navigate
//       navigate('/');
//     } catch (error) {
//       console.error('Error uploading the file:', error);
//       setError('Failed to upload the file. Please try again.');
//     }
//   };

//   return (
//     <>
//     <Navbar />
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
//             multiple
//             onChange={handleFileChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             accept={type === 'Resume' ? '.pdf,.doc,.docx' : '.csv,.xlsx'}
//           />
//         </div>
//         {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Import
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export const ImportResume = () => <ImportPage type="Resume" />;
// export const ImportSpreadsheet = () => <ImportPage type="Spreadsheet" />;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./utils/Navbar";
import axiosInstance from "./utils/axiosInstance";

const ImportPage = ({ type }) => {
  const [files, setFiles] = useState([]); // Array to store multiple files
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleFileChange = (e) => {
  //   const selectedFiles = [...e.target.files];
  //   console.log("Selected files:", selectedFiles); // Log selected files
  //   // setFiles([...e.target.files]); 
  //   setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  //   console.log(files,'filesldfadfdf');
  // };

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    let duplicateFiles = [];

    // Check if any selected file is already present in the existing files
    selectedFiles.forEach((file) => {
      if (files.some((existingFile) => existingFile.name === file.name)) {
        duplicateFiles.push(file.name);
      }
    });

    if (duplicateFiles.length > 0) {
      setError(`Duplicate files: ${duplicateFiles.join(", ")}. Please select other files.`);
    } else {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setError(""); // Clear any previous error
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      console.log('Updated files:', files);
    }
  }, [files]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    if (files.length === 0) {
      setError("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); // Append each file to the form data
    });

    try {
      const response = await axiosInstance.post("upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
      navigate("/"); // Optionally navigate after successful upload
    } catch (error) {
      console.error("Error uploading the files:", error);
      setError("Failed to upload the files. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Import from {type}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="file"
            >
              Select {type} files
            </label>
            <input
              type="file"
              id="file"
              multiple // Allow multiple file selection
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept={type === "Resume" ? ".pdf,.doc,.docx" : ".csv,.xlsx"}
            />
          </div>

          {/* Display list of selected files */}
          {files.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Selected files:</h3>
              <ul className="list-disc pl-5">
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="text-gray-700">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
