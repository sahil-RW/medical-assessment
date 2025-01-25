import React, { useState } from "react";
import Button from "../components/Button";
import UploadImage from "../assets/upload.webp";

const Medical = () => {
  const [illnessHistory, setIllnessHistory] = useState({
    location: [
      "Scalp",
      "Face",
      "Neck",
      "Throat",
      "Eyes",
      "Ears",
      "Nose",
      "Teeth",
      "Tongue",
      "Lips",
      "Head",
      "Chest",
      "Abdomen",
      "Uterus",
      "Cervical Spine",
      "Back",
      "Coccyx",
      "Multiple Joints",
      "Perioral area",
      "Axillae",
      "Perianal area",
      "Inguinal area",
      "External genitalia",
      "Thighs",
      "Legs",
      "Feet",
      "Hands",
      "Trunk",
      "Vulva",
      "Others",
    ],
    duration: [
      "Today",
      "Since Yesterday",
      "Since 2 Days",
      "Since 4 Days",
      "Since 6 Days",
      "Since 1 Week",
      "Since 2 Weeks",
      "Since 3 Weeks",
      "Since 6 Weeks",
      "Since 4 Weeks",
      "Since 2 Months",
      "Since 3 Months",
      "Since 4 Months",
      "Since 6 Months",
      "Since Long Time",
      "Uncertain",
      "Others",
    ],
    quality: [
      "Sharp",
      "Dull",
      "Throbbing",
      "Burning",
      "Nail type",
      "Traction type",
      "Colicky",
      "Radiating type",
      "Others",
    ],
    timing: ["Continuous", "Intermittent", "Others"],
    severity: ["Mild", "Moderate", "Severe", "Others"],
    modifyingFactors: ["Aggravating Factor", "Relieving Factor", "Others"],
    context: [
      "Following a simple fall",
      "Following a twisting injury",
      "Following a fall from height",
      "Following lifting a heavy object",
      "Pressed under a heavy object",
      "Caught between two objects",
      "Road traffic accident",
      "Motorbike accident",
      "Pedal cycle accident",
      "Slipped and fell over pavement",
      "Others",
    ],
    assciatedSymptoms: [
      "Numbness",
      "Weakness",
      "Dizziness",
      "Vomiting",
      "Nausea",
      "Fever",
      "Cough",
      "Headache",
      "Abdominal Pain",
      "Myalgia",
      "Difficulty in walking",
      "Interfering with ADL",
      "Others",
    ],
  });
  const [reviewSystems, setReviewSystems] = useState({
    location: [
      "Scalp",
      "Face",
      "Neck",
      "Throat",
      "Eyes",
      "Ears",
      "Nose",
      "Teeth",
      "Tongue",
      "Lips",
      "Head",
      "Chest",
      "Abdomen",
      "Uterus",
      "Cervical Spine",
      "Back",
      "Coccyx",
      "Multiple Joints",
      "Perioral area",
      "Axillae",
      "Perianal area",
      "Inguinal area",
      "External genitalia",
      "Thighs",
      "Legs",
      "Feet",
      "Hands",
      "Trunk",
      "Vulva",
      "Others",
    ],
    duration: [
      "Today",
      "Since Yesterday",
      "Since 2 Days",
      "Since 4 Days",
      "Since 6 Days",
      "Since 1 Week",
      "Since 2 Weeks",
      "Since 3 Weeks",
      "Since 6 Weeks",
      "Since 4 Weeks",
      "Since 2 Months",
      "Since 3 Months",
      "Since 4 Months",
      "Since 6 Months",
      "Since Long Time",
      "Uncertain",
      "Others",
    ],
    quality: [
      "Sharp",
      "Dull",
      "Throbbing",
      "Burning",
      "Nail type",
      "Traction type",
      "Colicky",
      "Radiating type",
      "Others",
    ],
    timing: ["Continuous", "Intermittent", "Others"],
    severity: ["Mild", "Moderate", "Severe", "Others"],
    modifyingFactors: ["Aggravating Factor", "Relieving Factor", "Others"],
    context: [
      "Following a simple fall",
      "Following a twisting injury",
      "Following a fall from height",
      "Following lifting a heavy object",
      "Pressed under a heavy object",
      "Caught between two objects",
      "Road traffic accident",
      "Motorbike accident",
      "Pedal cycle accident",
      "Slipped and fell over pavement",
      "Others",
    ],
    assciatedSymptoms: [
      "Numbness",
      "Weakness",
      "Dizziness",
      "Vomiting",
      "Nausea",
      "Fever",
      "Cough",
      "Headache",
      "Abdominal Pain",
      "Myalgia",
      "Difficulty in walking",
      "Interfering with ADL",
      "Others",
    ],
  });

  const [complaint, setComplaint] = useState("");
  const [addComplaint, setAddComplaint] = useState("");
  const [comments, setComments] = useState("");

  const renderData = (name, array) => {
    return (
      <div className="grid grid-cols-12 items-start gap-4 mb-4">
        {/* Left Column: Label */}
        <div className="col-span-2 text-left pr-4">
          <p className="font-medium">{name}:</p>
        </div>
        {/* Right Column: Buttons */}
        <div className="col-span-9 flex flex-wrap gap-2">
          {array.map((value, index) => (
            <Button
              key={index}
              name={value}
              // isSelected={}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h3 className="text-3xl font-extrabold text-center">
        Medical Assessment System
      </h3>
      <div className="flex flex-col items-center justify-center mt-10">
        <h3 className="text-xl font-bold  mb-10">
          Upload Your Audio Recording
        </h3>
        <input
          type="file"
          id="audio-upload"
          accept="audio/*"
          style={{ display: "none" }}
          // onChange={handleFileChange}
        />

        {/* Label that triggers file input */}
        <label
          htmlFor="audio-upload"
          className="cursor-pointer flex flex-col justify-center items-center border border-black rounded-[10px] px-[50px] py-10"
        >
          <img src={UploadImage} width={50} height={50} className="mb-5"/>
          <p className="">Click here to select an audio file</p>
        </label>
      </div>
      <p className="mb-5">
        <b>Chief Complaint</b>
      </p>
      <div className="mb-10">
        <p className="mb-5">Complaint : </p>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Wite your complaint here..."
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <p className="mb-10">
        <b>History Of Present Illness</b>
      </p>
      {renderData("Location", illnessHistory.location)}
      {renderData("Duration", illnessHistory.duration)}
      {renderData("Character / Quality", illnessHistory.quality)}
      {renderData("Frequency / Timing", illnessHistory.timing)}
      {renderData("Severity", illnessHistory.severity)}
      {renderData("Modifying Factors", illnessHistory.modifyingFactors)}
      {renderData("Context", illnessHistory.context)}
      {renderData("Associated Symptoms", illnessHistory.assciatedSymptoms)}
      <div className="mb-10">
        <p className="mb-5">Additional Complaint : </p>
        <textarea
          value={addComplaint}
          onChange={(e) => setAddComplaint(e.target.value)}
          placeholder="Wite any additional complaints here..."
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <p className="mb-10">
        <b>Review Of Systems</b>
      </p>
      {renderData("Location", reviewSystems.location)}
      {renderData("Duration", reviewSystems.duration)}
      {renderData("Character / Quality", reviewSystems.quality)}
      {renderData("Frequency / Timing", reviewSystems.timing)}
      {renderData("Severity", reviewSystems.severity)}
      {renderData("Modifying Factors", reviewSystems.modifyingFactors)}
      {renderData("Context", reviewSystems.context)}
      {renderData("Associated Symptoms", reviewSystems.assciatedSymptoms)}
      <div className="mb-10">
        <p className="mb-5">Comments : </p>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Wite your comments here..."
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </div>
  );
};

export default Medical;
