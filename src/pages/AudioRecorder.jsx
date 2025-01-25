import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Pause, Play, Save } from 'lucide-react';
import axios from 'axios';
import LoadingGif from '../assets/loading.gif';

const AudioRecorder = () => {
  const navigate = useNavigate();
  const [recordingStatus, setRecordingStatus] = useState('idle'); // 'idle', 'recording', 'paused'
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [loading, setLoading] = useState(false);

  // Timer management
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start recording
  const startRecording = async () => {
    try {
      // enumerate devices and select the audio input
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInput = devices.find((device) => device.kind === 'audioinput');

      // Request microphone access for the selected audio input
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          deviceId: audioInput.deviceId,
          channelCount: 2,
          sampleRate: 48000,
          sampleSize: 16,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true, 

        } 
      });
      // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream,{
        mimeType: 'audio/webm;codecs=opus',    // Audio mime type
        bitsPerSecond: 128000,                  // Bits per second
        audioBitsPerSecond: 128000 
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = []; // Clear previous chunks
  
      console.log('Initial audio chunks:', audioChunksRef.current);
  
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log('Audio chunk appended:', event.data);
        }
      };
  
      // Start recording with a timeslice to trigger ondataavailable frequently
      const timeslice = 1000; // 1 second
      mediaRecorder.start(timeslice);
  
      setRecordingStatus('recording');
      console.log('Recording started');
      startTimer();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Please grant microphone permissions to record audio.');
    }
  };
  
  // Pause recording
  const pauseRecording = () => {
    if (recordingStatus === 'recording' && mediaRecorderRef.current) {
      mediaRecorderRef.current.pause();
      setRecordingStatus('paused');
      console.log('Recording paused');
      clearInterval(timerRef.current);
    }
  };

  // Resume recording
  const resumeRecording = () => {
    if (recordingStatus === 'paused' && mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setRecordingStatus('recording');
      console.log('Recording resumed');
      startTimer();
    }
  };

  // Save and send audio to backend
  const handleSave = async () => {
    if (!audioChunksRef.current.length) {
      alert('No audio recorded. Please record audio first.');
      return;
    }
  
    try {
      // Stop recording if still active
      if (recordingStatus !== 'idle' && mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecordingStatus('idle');
      }

      // Show loading indicator
      setLoading(true);

      console.log('Final audio chunks:', audioChunksRef.current);
      // Create audio blob from chunks
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioBlob(blob); // Optional, if you want to save it in state
  
      // Upload to backend
      const formData = new FormData();
      formData.append('file', blob, `recorded-audio-${new Date().toISOString()}.webm`);
      console.log('Blob:', blob);
      console.log('Uploading audio:', formData);
  
      const response = await axios.post('http://localhost:8000/process-audio/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Navigate to transcription page
      navigate('/transcription');
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Failed to process audio. Please try again.');
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };  

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Render record button based on recording status
  const renderRecordButton = () => {
    switch (recordingStatus) {
      case 'idle':
        return (
          <div className="flex flex-col items-center">
            <button
              onClick={startRecording}
              className="w-32 h-32 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <Mic className="w-8 h-8 text-white" />
            </button>
            <p className="mt-4 text-gray-600">Tap to Record</p>
          </div>
        );
      case 'recording':
        return (
          <div className="flex flex-col items-center">
            <button
              onClick={pauseRecording}
              className="w-32 h-32 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <Pause className="w-8 h-8 text-white" />
            </button>
            <p className="mt-4 text-red-600">{formatTime(recordingTime)}</p>
          </div>
        );
      case 'paused':
        return (
          <div className="flex flex-col items-center">
            <button
              onClick={resumeRecording}
              className="w-32 h-32 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors"
            >
              <Play className="w-8 h-8 text-white" />
            </button>
            <p className="mt-4 text-yellow-600">Paused - Tap to Resume</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl  p-20 items-start  justify-center">
      <h1 className="text-4xl font-bold text-center mb-12">Audio Recorder</h1>
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col items-center gap-6">
          {/* Loading GIF */}
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src= {LoadingGif}
                alt="Loading..."
                className="w-16 h-16"
              />
              <p className="text-gray-600 text-lg font-medium">Processing...</p>
            </div>
          ) : (
            <>
              {/* Record Button */}
              {renderRecordButton()}
  
              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={recordingStatus === 'idle'}
                className={`w-full ${
                  recordingStatus === 'idle'
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors`}
              >
                <Save className="w-5 h-5" />
                Save & Transcribe
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );  
};

export default AudioRecorder;