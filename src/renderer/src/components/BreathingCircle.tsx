import React from 'react'

const BreathingCircle: React.FC = () => {
  return (
    <div className="breathing-circle">
      <style>
        {`
          .breathing-circle {
            position: relative;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #39AB63;
            animation: breathe 3s infinite alternate;
            box-shadow: 0 0 6px #39AB63;
          }

          @keyframes breathe {
            0% {
              opacity: 0.8;
            }
            66% {
              opacity: 0.9;
            }
            100% {
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  )
}

export default BreathingCircle
