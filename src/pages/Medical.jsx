import React, { useState } from "react";
import Button from "../components/Button";
import UploadImage from "../assets/upload.webp";
import axios from 'axios';

const Medical = () => {
  const [illnessHistory1, setIllnessHistory1] = useState({
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
  const [illnessHistory,setIllnessHistory]= useState({})

  const [reviewSystems1, setReviewSystems1] = useState({
    constitutional: [
      "Normal",
      "General appearance",
      "Fever",
      "Chills/Rigors",
      "Night sweats",
      "Fatigue",
      "Weight change",
      "Appetite change",
      "Giddiness",
      "Dehydration",
      "Weight Loss",
      "Weight Gain",
      "Others",
    ],
    respiratory: [
      "Normal",
      "Shortness of Breath",
      "Hemoptysis",
      "Wheezing",
      "Expectoration",
      "Sputum",
      "Chest pain",
      "Others",
    ],
    genitourinary: [
      "Normal",
      "Hematuria",
      "Increased frequency",
      "Incontinence",
      "Frank pain",
      "Pelvic pain",
      "Leukorrhea",
      "Back pain",
      "Abdominal pain",
      "Increased frequency of urination",
      "Enuresis",
      "Infertility",
      "Sexual dysfunction",
      "Pruritus vulvae",
      "Mastodynia",
      "Breast lump",
      "Nipple discharge",
      "Amenorrhoea",
      "Renal colic",
      "Prostate pain",
      "Penile pain",
      "Testicular pain",
      "Others",
    ],
    skin: [
      "Normal",
      "Rash",
      "Pruritus",
      "Sores/Ulcers/Pustules",
      "Nail changes",
      "Skin thickening",
      "Pigmentation",
      "Eczema",
      "Pain",
      "Dryness",
      "Itching",
      "Nail discoloration",
      "Abscess",
      "Others",
    ],
    cardiovascular: [
      "Normal",
      "Chest pain",
      "PND",
      "Orthopnea",
      "Edema",
      "Syncope",
      "Dyspnoea",
      "Cyanosis",
      "Others",
    ],
    musculoskeletal: [
      "Normal",
      "Arthralgia",
      "Myalgia",
      "Muscle weakness",
      "Swelling of joints",
      "H/O falls",
      "Back pain",
      "Others",
    ],
    neurological: [
      "Normal",
      "Headache",
      "Attacks",
      "Tremors",
      "Numbness",
      "Dizziness",
      "Loss of sensation",
      "Seizures",
      "Others",
    ],
    gastrointestinal: [
      "Normal",
      "Abdomen",
      "Abdominal pain",
      "Nausea",
      "Hernia",
      "Vomiting",
      "Heartburn",
      "Constipation",
      "Blood in stool",
      "Epigastric Pain",
      "Others",
    ],
    endocrine: [
      "Normal",
      "Excessive Thirst",
      "Polyuria",
      "Polydipsia",
      "Polyphagia",
      "Cold Intolerance",
      "Heat Intolerance",
      "Goitre",
      "Impotence",
      "Galactorrhoea",
      "Others",
    ],
    eyes: [
      "Normal",
      "Blurry vision",
      "Eye pain",
      "Eye discharge",
      "Dry eyes",
      "Decreased vision",
      "Red itchy eyes",
      "Irritation",
      "Photophobia",
      "Watering",
      "Others",
    ],
    earsNoseThroat: [
      "Normal",
      "Ear pain",
      "Throat pain",
      "Nose bleed",
      "Decreased hearing",
      "Hearing loss",
      "Ear discharge",
      "Nasal discharge",
      "Others",
    ],
    psychiatric: [
      "Normal",
      "Judgement and Insight",
      "Depression",
      "Orientation",
      "Anxiety",
      "Recent and Remote memory",
      "Phobia",
      "Mood and affect",
      "Alcohol / Drug abuse",
      "Insomnia",
      "Hyperactive",
      "Less active",
      "Temper tantrums",
      "Lack of eye contact",
      "Attention Deficits",
      "Others",
    ],
    allergicImmunological: [
      "Normal",
      "Allergic rhinitis",
      "Hay fever",
      "Asthma",
      "Running nose",
      "Blood in nose",
      "Food/drug allergy",
      "Positive allergy test",
      "Neurocutaneous",
      "Others",
    ],
    hematologicLymphatic: [
      "Normal",
      "Easy bruising",
      "Bleeding diathesis",
      "Blood clots",
      "Swollen glands",
      "Lymphadenopathy",
      "Petechiae/Purpura",
      "Bleeding from any site",
      "Purpura / Ecchymosis",
      "Others",
    ],
    obg: [
      "Normal",
      "Leukorrhea",
      "Menstrual disturbance",
      "Pregnant/Lactation",
      "Use of hormonal state",
      "Others",
    ],
  });
  const [reviewSystems, setReviewSystems] = useState();

  const [complaint, setComplaint] = useState("");
  const [addComplaint, setAddComplaint] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setShowForm(false);

    try {
      // Send audio file to the backend
      const response = await axios.post("http://localhost:8000/process-audio/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Update the state based on the JSON response
      const responseData = response.data;
      console.log("final jis", responseData);
     const check1 = responseData.relevant_data.illnessHistory
      const normalizedIllnessHistory = Object.keys(check1).reduce(
        (acc, key) => {
          const value = check1[key];
          // Make sure each field is an array
          acc[key] = Array.isArray(value) ? value : [value];
          return acc;
        },
        {}
      );

      const check2 = responseData.relevant_data.reviewSystems
      const normalizedReviewSystems = Object.keys(check2).reduce(
        (acc, key) => {
          const value = check2[key];
          // Make sure each field is an array
          acc[key] = Array.isArray(value) ? value : [value];
          return acc;
        },
        {}
      );

      setReviewSystems(normalizedReviewSystems)
      setIllnessHistory(normalizedIllnessHistory); 
      setComplaint(responseData.relevant_data.chiefComplaint || "");
      setAddComplaint(responseData.relevant_data.additionalComplaint || "");
      setComments(responseData.relevant_data.comments || "");

      setShowForm(true);
      setLoading(false);
    } catch (error) {
      console.error("Error processing video:", error);
      setLoading(false);
    }
  };

  const isSelected = (field, value, index, array) => {
    const fieldValues = illnessHistory[field];
  
    if (!Array.isArray(fieldValues) || fieldValues.length === 0) {
      return false;
    }
  
    if (fieldValues.includes(value)) {
      return true;
    }

    if (index === array.length - 1) {
      return !array.slice(0, -1).some(val => 
        fieldValues.includes(val)
      );
    }
    
    return false;
  };

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
              isSelected={isSelected(name, value, index, array)}
            />
          ))}
        </div>
      </div>
    );
  }

  const isSelecte = (field, value) => {
    const systemValues = reviewSystems[field];
    if (!systemValues || systemValues.length === 0 || (systemValues.length === 1 && systemValues[0] === "")) {
      return value === "Normal";
    }
    return reviewSystems[field]?.includes(value);
  };

  const renderDatas = (name, array) => {
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
              isSelected={isSelecte(name, value)}
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

      {!showForm && !loading && (
      <div className="flex flex-col items-center justify-center mt-10">
        <h3 className="text-xl font-bold  mb-10">
          Upload Your Audio Recording
        </h3>
        <input
          type="file"
          id="audio-upload"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
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
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-xl font-bold">Processing your audio...</p>
          <div className="loader mt-5"></div>
        </div>
      )}

  {showForm && (
    <div>
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
      {Object.entries(illnessHistory1).map(([key, value]) => renderData(key, value))}

      <br/>
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
      {Object.entries(reviewSystems1).map(([key, value]) => renderDatas(key, value))}
      <div className="mb-10">
        <p className="mb-5">Other Comments : </p>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Wite any other comments here..."
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </div>
    )}
    </div>
  );
};

export default Medical;
