import React from 'react';
import '../App.css';

const ProgressBar = ({ status }) => {
  const progressStages = ['application sent', 'shortlisted', 'selected'];
  const currentStageIndex = progressStages.indexOf(status);

  return (
    <div className='progress-bar'>
      {progressStages.map((stage, index) => (
        <div key={index} className={`progress-step ${index <= currentStageIndex ? 'completed' : ''}`}>
          {stage}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
