import React, { useContext, useRef, useState ,useEffect} from 'react';
import axios from 'axios';
import { DataContext } from '../context/main';
import { useParams } from 'react-router';
const FaceRecognition = (props) => {
  const videoRef = useRef(null);
    //holdding the attandance id
    const { holdingattandanceid, setholdingattandanceid,sendattandance,getlocation } = useContext(DataContext);
    const { subid } = useParams();
    //to disable the facerecogination part one the attendance is marked
    const{setisclicked}=props

    //for storing the latitude and longitude of the student
    const[studentlatitude,setstudentlatitude]=useState(null);
    const[studentlongitude,setstudentlongitude]=useState(null)
    const [studentlocationerror,setstudentlocationerror]=useState(null)
useEffect(() => {
  getlocation().then(({latitude,longitude,error})=>
{
    if(error)
        {
            console.log("error in then is:",error)
            setstudentlocationerror(error)
        }
        else{
            console.log("the latitude is :",latitude)
            setstudentlatitude(latitude)
            console.log("the longitude is:",longitude)
            setstudentlongitude(longitude)
        }
}).catch((error)=>
{
    console.log("error in catch is:",error)
    setstudentlocationerror(error)
})

  
}, [getlocation])
    //starting the video to fetch the frame
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
    //stoping the video once attanddance is marked
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

    //capturing the photo from the video
    const captureImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        recognizeFace(imageData);
    };

    //sending the photo to server for recognisation
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

    console.log("in the face recognisation part:" ,holdingattandanceid," ",localStorage.getItem('subjectcode')," ",localStorage.getItem('subjectname'),attandancedate,studentlatitude," ",studentlongitude)

        let studentid=holdingattandanceid
        let subjectcode=localStorage.getItem('subjectcode')
        let subjectname=localStorage.getItem('subjectname')
        let status="absent"
        if(!studentlatitude||!studentlongitude)
            {
                return studentlocationerror;
            }
        //sendattandance(studentid,subjectcode,subjectname,status,attandancedate,studentlatitude,studentlongitude,subid) //[passing the subid for fetching the data back]
        stopvideo()
        setisclicked(false) //setting back the markattandance button
        
    }
    


    return (
        <div>
            <video ref={videoRef} maxWidth="640" height="480" playsInline></video>
            <div className='mx-3 my-3' style={{maxWidth:"100%"}}>
            
            
            <span class="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm mx-2" style={{maxWidth:"100%"}}>
  <button
    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative" onClick={startVideo}
  >
    Start Video
  </button>

  <button
    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative" onClick={captureImage}
  >
    Recognize face
  </button>

  <button
    class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative" onClick={collectingattandance}
  >
    Mark Present
  </button>
</span>

{holdingattandanceid && <p><b>Recognized Face:</b> <h6>{holdingattandanceid}</h6></p>}</div>

        </div>
    );
};

export default FaceRecognition;
