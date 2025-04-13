  import React, { useState } from 'react';
  import 'react-toastify/dist/ReactToastify.css';
  import { ToastContainer } from 'react-toastify';
  import { handleError, handleSuccess } from './utils';
  const App = () => {
    const [file, setfile] = useState(null);

    const handleChange=async(e)=>{
      const selectedFile=e.target.files[0]
      if(selectedFile){
        setfile(selectedFile);
      }
    }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (!file) {
      return handleError("Please select a file before uploading.");
    }
    try{
      const formData=new FormData()
      formData.append("profileImage", file);
      const response=await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
      const result = await response.json();
      if (!response.ok || !result.success) {
        return handleError(result.message || "Upload failed.");
      }
      handleSuccess(result.message);
    }catch (err) {
      handleError("Something went wrong while uploading the file.");
    }
    }
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col items-center space-y-6 border border-white/20">
          <h1 className="text-2xl text-white font-semibold">Upload Your File</h1>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            className="bg-white/80 text-black file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-800 transition-all"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-all"
          >
            Upload File
          </button>
      </form>
      <ToastContainer />
      </div>
    );
  };

  export default App;
