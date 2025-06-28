import React from 'react'

export const YellowBreathingCircle: React.FC = () => {
  return (
    <div className="yellow-breathing-circle">
      <style>
        {`
          .yellow-breathing-circle {
            position: relative;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #EBB733; /* 金色 */
            animation: breathe-yellow 3s infinite alternate;
            box-shadow: 0 0 6px #EBB733;
          }

          @keyframes breathe-yellow {
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

export const GreenBreathingCircle: React.FC = () => {
  return (
    <div className="green-breathing-circle">
      <style>
        {`
          .green-breathing-circle {
            position: relative;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #66B97A; /* 绿色 */
            animation: breathe-green 3s infinite alternate;
            box-shadow: 0 0 6px #66B97A;
          }

          @keyframes breathe-green {
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

export const RedBreathingCircle: React.FC = () => {
  return (
    <div className="red-breathing-circle">
      <style>
        {`
          .red-breathing-circle {
            position: relative;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #DF4F4D; /* 红色 */
            animation: breathe-red 3s infinite alternate;
            box-shadow: 0 0 6px #DF4F4D;
          }

          @keyframes breathe-red {
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
