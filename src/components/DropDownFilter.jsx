import React, { useState } from 'react';
import '../App.css';

const DropDownFilter = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills] = useState(["Frontend", "CSS", "JavaScript", "React", "Node.js"]);

  const handleSkillSelect = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleApplyFilter = () => {
    alert("Filters applied: " + selectedSkills.join(", "));
  };

  const handleClear = () => {
    setSelectedSkills([]);
  };

  return (
    <div className='filter-section'>
      <select className="dropdown" onChange={handleSkillSelect} defaultValue="">
        <option value="" disabled>Skills</option>
        {availableSkills.map((skill, index) => (
          <option key={index} value={skill}>{skill}</option>
        ))}
      </select>

      {selectedSkills.map((skill, index) => (
        <div key={index} className="tag">
          {skill}
          <button onClick={() => handleRemoveSkill(skill)}>X</button>
        </div>
      ))}

      <div className="button-container">
        <button className='filter-btn' onClick={handleApplyFilter}>Apply Filter</button>
        <button className="clear-button" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default DropDownFilter;
