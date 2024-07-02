import React, { useState } from "react";

function BlogPage() {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [mediaUrls, setMediaUrls] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !folderName) {
      alert("Please select a file and enter a folder name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", folderName);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/uploadmedia`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload media.");
      }

      const data = await response.json();
      setDownloadURL(data.url); // Set the download URL in state
      alert("Media uploaded successfully!\nURL: " + data.url);

      // If mediaUrls is present in the response, update the state
      if (data.mediaUrls && Array.isArray(data.mediaUrls)) {
        setMediaUrls(data.mediaUrls);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload media. Please try again.");
    }
  };

  return (
    <div>
      <h1>Blog Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select File:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="folderName">Folder Name:</label>
          <input
            type="text"
            id="folderName"
            name="folderName"
            value={folderName}
            onChange={handleFolderNameChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {downloadURL && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={downloadURL} alt="Uploaded" />
        </div>
      )}
      {mediaUrls.length > 0 && (
        <div>
          <h2>Uploaded Media:</h2>
          {mediaUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Uploaded ${index}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPage;
