import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save } from 'lucide-react';

const Transcription = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState('');
  const [segmentedSummary, setSegmentedSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch summaries when component mounts
  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        // Fetch summary
        const summaryResponse = await axios.get('http://localhost:8000/get-summary/');
        setSummary(summaryResponse.data.summary || 'No summary available');

        // Fetch segmented summary
        const segmentedSummaryResponse = await axios.get('http://localhost:8000/get-segmented-summary/');
        setSegmentedSummary(segmentedSummaryResponse.data.segmented_summary || 'No segmented summary available');
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching summaries:', error);
        setIsLoading(false);
        alert('Failed to load summaries');
      }
    };

    fetchSummaries();
  }, []);

  const handleSaveSummary = async () => {
    try {
      await axios.post('http://localhost:8000/update-summary/', {
        summary: summary
      });

      alert('Summary saved successfully!');
    } catch (error) {
      console.error('Error saving summary:', error);
      alert('Failed to save summary. Please try again.');
    }
  };

  const handleSaveSegmentedSummary = async () => {
    try {
      await axios.post('http://localhost:8000/update-segmented-summary/', {
        segmented_summary: segmentedSummary
      });

      alert('Segmented Summary saved successfully!');
    } catch (error) {
      console.error('Error saving segmented summary:', error);
      alert('Failed to save segmented summary. Please try again.');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-2">Summary</h2>
            <button 
              onClick={handleSaveSummary}
              className="bg-green-500 text-white px-4 py-2 text-sm rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              {/* <Save className="w-4 h-4 flex-1" /> */}
              Save Summary
            </button>
          </div>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Your summary will appear here..."
            className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Segmented Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Segmented Summary</h2>
            <button 
              onClick={handleSaveSegmentedSummary}
              className="bg-blue-500 text-sm text-white  py-2 rounded-md hover:bg-blue-600 transition-colors  flex items-center "
            >
              <Save className="w-6 h-4 flex-1" />
              Save Segmented Summary
            </button>
          </div>
          <textarea
            value={segmentedSummary}
            onChange={(e) => setSegmentedSummary(e.target.value)}
            placeholder="Your segmented summary will appear here..."
            className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-black px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Recorder
        </button>
      </div>
    </div>
  );
};

export default Transcription;