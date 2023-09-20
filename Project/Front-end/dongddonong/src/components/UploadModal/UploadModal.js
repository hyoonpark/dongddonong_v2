import React, { useState } from "react";

const UploadModal = () => {
  const [files, setFiles] = useState(null);
  const [imagesSrc, setImagesSrc] = useState([]);
  const [status, setStatus] = useState("initial");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFiles(e.target.files);
      console.log([...e.target.files]);
      [...e.target.files].forEach((file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // console.log(reader.result)
        const srcList = []
        
        return new Promise((resolve) => {
            reader.onload = () => {
                // setImagesSrc(reader.result || null);
                if (reader.result) {setImagesSrc((prevFiles) => [...prevFiles, reader.result])};
                console.log(imagesSrc)
                resolve();
            }
        })
        
      })
    }
  };

  const handleUpload = async () => {
    if (files) {
      setStatus("uploading");

      const formData = new FormData();

      [...files].forEach((file) => {
        console.log(file.result)
        formData.append("files", file);
      });

      try {
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose files
        </label>
        <input id="file" type="file" multiple onChange={handleFileChange} />
      </div>
      {files &&
        [...files].map((file, index) => (
          <section key={file.name}>
            File number {index + 1} details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        ))}

      {files && (
        <button onClick={handleUpload} className="submit"> 
          Upload {files.length > 1 ? "files" : "a file"}  {/* 조건부로 글자를 렌더링하네   */}
         
        </button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }) => {
  if (status === "success") {
    return <p>✅ Uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ Upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading started...</p>;
  } else {
    return null;
  }
};

export default UploadModal;