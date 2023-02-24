import React , {useState} from 'react';
import S3 from 'react-aws-s3';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))
    }
    return <div className='page'>
        <div className='navbar'>React S3 File Upload</div>
            <div className='dragdiv'>
            <label for="images" class="drop-container">
            <span class="drop-title">Drop files here</span>
            or
            <input type="file" id="images" accept="image/*" onChange={handleFileInput}required></input>
            </label>
            </div>
        <br></br>
            <div class="container">
                <a onClick={() => uploadFile(selectedFile)} class="button">
                <div class="button__line"></div>
                <div class="button__line"></div>
                <span class="button__text">Upload</span>
                <div class="button__drow1"></div>
                <div class="button__drow2"></div>
                </a>
        </div>
    </div>
}

export default Upload;