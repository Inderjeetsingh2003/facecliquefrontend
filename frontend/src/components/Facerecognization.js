import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../context/main';
import { useParams } from 'react-router';
const FaceRecognition = (props) => {
    const videoRef = useRef(null);
    const { holdingattandanceid, setholdingattandanceid,sendattandance } = useContext(DataContext);
    const[latitude,setlatitude]=useState(null);
    const[longitude,setlongitude]=useState(null)
    const [error,seterror]=useState(null)
    const { subid } = useParams();
    const{setisclicked}=props
    const startVideo = () => {
    
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch((err) => {
                console.error('Error accessing the camera', err);
            });

    };
    const stopvideo=()=>
    {
        
            const stream = videoRef.current.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                
                tracks.forEach((track) => {
                    track.stop();
                });
            }
    
        
           
            videoRef.current.srcObject = null;
            
        
    
    }

    const captureImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        recognizeFace(imageData);
    };

    const recognizeFace = async (imageData) => {
        try {
            const response = await axios.post('http://localhost:5001/recognize', { imageData });
            //console.log(response.data.recognized_face);
            setholdingattandanceid(() => response.data.recognized_face);
        } catch (error) {
            console.error('Error recognizing face', error);
        }
    };

//getting the data:
const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
    //sending the attandace to backend
    const collectingattandance=async()=>
    {
        let attandancedate=getFormattedDate();
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(async(pos)=>
        {
            setlatitude(await pos.coords.latitude)
            setlongitude(await pos.coords.longitude)
            seterror(null)
        },
    (error)=>
{
    seterror(error.message)
})   }
else{
    console.log("the browser does not suppport geo location")
}
    

    console.log("in the face recognisation part:" ,holdingattandanceid," ",localStorage.getItem('subjectcode')," ",localStorage.getItem('subjectname'),attandancedate,)

        let studentid=holdingattandanceid
        let subjectcode=localStorage.getItem('subjectcode')
        let subjectname=localStorage.getItem('subjectname')
        let status="absent"
   
        sendattandance(studentid,subjectcode,subjectname,status,attandancedate,latitude,longitude,subid) //[passing the subid for fetching the data back]
        stopvideo()
        setisclicked(false) //setting back the markattandance button
        
    }
    


    return (
        <div>
            <video ref={videoRef} width="640" height="480" playsInline></video>
            <div className='mx-4 my-3'>
            <button type="button" class="btn btn-primary btn-lg mx-3" onClick={startVideo}>Start Video</button>
            <button type="button" class="btn btn-primary btn-lg mx-3"  onClick={captureImage}>Recognize Face</button>
            <button type="button" class="btn btn-primary btn-lg" onClick={collectingattandance}>mark your present</button>

            {holdingattandanceid && <p><b>Recognized Face:</b> <h6>{holdingattandanceid}</h6></p>}</div>
        </div>
    );
};

export default FaceRecognition;
