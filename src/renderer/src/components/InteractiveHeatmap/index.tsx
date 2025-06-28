import React, { useEffect, useState } from 'react'

const InteractiveHeatmap: React.FC = () => {
  // Used to store received messages
  const [messages, setMessages] = useState<any[]>([])
  const [isTraining, setIsTraining] = useState(false) // Controls whether training is in progress
  const [isPaused, setIsPaused] = useState(false) // Controls whether training is paused
  const [socket, setSocket] = useState<WebSocket | null>(null) // WebSocket connection
  const [isConnected, setIsConnected] = useState(false) // WebSocket connection status

  // Initialize cache (using localStorage to persist data between page reloads)
  useEffect(() => {
    const cachedMessages = localStorage.getItem('messages')
    if (cachedMessages) {
      setMessages(JSON.parse(cachedMessages))
    }
  }, [])

  // Establish WebSocket connection
  const connectWebSocket = () => {
    const socket = new WebSocket('ws://localhost:5555')

    socket.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true) // WebSocket connected
    }

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data)
      console.log('Received new data:', newData)

      // Update buttons based on training status
      if (newData.status === 'training_complete') {
        setIsTraining(false) // When training is complete, enable buttons again
      }

      if (newData.status === 'training_aborted') {
        setIsTraining(false)
        setIsPaused(false)
        console.log('Training aborted')
      }

      if (newData.status === 'training_stopped') {
        setIsPaused(true)
        console.log('Training stopped')
      }

      if (newData.status === 'training_resumed') {
        setIsPaused(false)
        setIsTraining(true)
        console.log('Training resumed')
      }

      // Update message list with new data
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newData]
        // Persist messages in localStorage
        localStorage.setItem('messages', JSON.stringify(updatedMessages))
        return updatedMessages
      })
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
      setIsConnected(false) // Update status if connection error occurs
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed')
      setIsConnected(false) // Update status if connection is closed
    }

    return socket
  }

  useEffect(() => {
    const socket = connectWebSocket() // Establish WebSocket connection when the component mounts
    setSocket(socket)

    return () => {
      console.log('Cleaning up WebSocket connection')
      socket.close() // Close WebSocket connection when the component unmounts
    }
  }, []) // Empty dependency array to ensure WebSocket is established only when the component first loads

  // Start training button click event
  const startTraining = () => {
    if (socket) {
      setIsTraining(true) // Lock the button
      setMessages([]) // Reset cached messages when starting training
      localStorage.removeItem('messages') // Remove cache in localStorage
      const startMessage = { action: 'start_training' }
      socket.send(JSON.stringify(startMessage))
      console.log('Sent start training command:', startMessage) // Confirm command sent
    }
  }

  // Abort training
  const abortTraining = () => {
    if (socket) {
      const abortMessage = { action: 'abort_training' }
      socket.send(JSON.stringify(abortMessage))
      console.log('Sent abort training command:', abortMessage)
    }
  }

  // Stop training
  const stopTraining = () => {
    if (socket) {
      const stopMessage = { action: 'stop_training' }
      socket.send(JSON.stringify(stopMessage))
      console.log('Sent stop training command:', stopMessage)
    }
  }

  // Resume training
  const resumeTraining = () => {
    if (socket) {
      const resumeMessage = { action: 'resume_training' }
      socket.send(JSON.stringify(resumeMessage))
      console.log('Sent resume training command:', resumeMessage)
    }
  }

  // Reconnect WebSocket
  const reconnectWebSocket = () => {
    console.log('Attempting to reconnect...')
    setIsConnected(false) // Reset connection status
    const socket = connectWebSocket() // Reconnect WebSocket
    setSocket(socket)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Interactive Data</h1>

      {/* WebSocket connection status indicator with breathing light effect */}
      <div className="flex items-center mb-4">
        <div
          className={`w-4 h-4 rounded-full mr-4 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500 animate-pulse'}`}
        ></div>
        <button
          onClick={reconnectWebSocket}
          disabled={isConnected}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            isConnected
              ? 'bg-gray-500 text-white cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Reconnect
        </button>
      </div>

      {/* Start Training Button */}
      <button
        onClick={startTraining}
        disabled={isTraining || isPaused || !isConnected}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
          isTraining
            ? 'bg-blue-500 text-white cursor-not-allowed'
            : isPaused
              ? 'bg-yellow-500 text-white'
              : 'bg-green-500 text-white hover:bg-green-600'
        } ${!isConnected ? 'bg-gray-500 text-white opacity-60 bg-gradient-to-r from-gray-400 to-gray-500' : ''}`}
      >
        {isTraining ? 'Training...' : 'Start Training'}
      </button>

      {/* Abort Training Button */}
      <button
        onClick={abortTraining}
        disabled={(!isTraining && !isPaused) || !isConnected}
        className={`mt-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
          (!isTraining && !isPaused) || !isConnected
            ? 'bg-gray-500 text-white cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        Abort Training
      </button>

      {/* Stop Training Button */}
      <button
        onClick={stopTraining}
        disabled={!isTraining || !isConnected}
        className={`mt-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
          !isTraining || !isConnected
            ? 'bg-gray-500 text-white cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500'
            : 'bg-yellow-500 text-white hover:bg-yellow-600'
        }`}
      >
        Stop Training
      </button>

      {/* Resume Training Button */}
      <button
        onClick={resumeTraining}
        disabled={!isPaused || !isConnected}
        className={`mt-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
          !isPaused || !isConnected
            ? 'bg-gray-500 text-white cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Resume Training
      </button>

      {/* Display received raw JSON data */}
      <ul className="mt-4">
        {messages.length === 0 ? (
          <li>No data received</li>
        ) : (
          messages.map((msg, index) => (
            <li key={index} className="mb-2">
              <strong>Received Data:</strong>
              <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(msg, null, 2)}</pre>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default InteractiveHeatmap
