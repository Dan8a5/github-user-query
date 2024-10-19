import React, { useState, useEffect, useMemo } from 'react'
import { useSpring, animated, to as interpolate, createInterpolator } from '@react-spring/web'
import UserCardList from './components/UserCardList'

function AnimatedSubmitButton({ isLoading }) {
  const [isHovered, setIsHovered] = useState(false)
  const spring = useSpring({
    scale: isHovered ? 1.05 : 1,
    boxShadow: isHovered ? '0 4px 6px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
  })

  return (
    <animated.button 
      type="submit" 
      style={spring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-400"
      disabled={isLoading}
    >
      {isLoading ? 'Searching...' : 'Submit'}
    </animated.button>
  )
}

function AnimatedDarkModeToggle({ darkMode, toggleDarkMode }) {
  const spring = useSpring({
    rotate: darkMode ? 180 : 0,
    config: { tension: 300, friction: 10 },
  })

  return (
    <animated.button 
      onClick={toggleDarkMode} 
      style={spring}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
    >
      {darkMode ? '🌞' : '🌙'}
    </animated.button>
  )
}

function App() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  const gradientConfig = {
    from: '#0bd1ff',
    mid: '#35833d',
    to: '#ffd34e',
    angle: 32,
    stops: 5,
  }

  const { colorFrom, colorMid, colorTo } = useSpring({
    colorFrom: gradientConfig.from,
    colorMid: gradientConfig.mid,
    colorTo: gradientConfig.to,
  })

  const coordinates = useMemo(() => {
    return Array.from({ length: gradientConfig.stops }, (_, i) => {
      const t = i / (gradientConfig.stops - 1)
      return { x: t, y: t * t * (3 - 2 * t) }
    })
  }, [gradientConfig.stops])

  const allStops = interpolate([colorFrom, colorMid, colorTo], (from, mid, to) => {
    const blend = createInterpolator({ range: [0, 0.5, 1], output: [from, mid, to] })
    return coordinates.map(({ x, y }) => {
      const color = blend(y)
      return `${color} ${x * 100}%`
    })
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (!response.ok) throw new Error('User not found or API request failed')
      const userData = await response.json()
      setUsers((prevUsers) => [...prevUsers, userData])
      setUsername('')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <animated.div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'dark' : ''}`}
      style={{
        backgroundImage: allStops.to((...args) => `linear-gradient(${gradientConfig.angle}deg, ${args.join(', ')})`),
      }}
    >
      <div className="w-full max-w-md p-6 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-yellow-400 text-center flex-grow">
            Github User Query
          </h1>
          <AnimatedDarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter Github username"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <AnimatedSubmitButton isLoading={isLoading} />
        </form>
        {error && <p className="text-red-500 dark:text-red-400 text-center mb-4">{error}</p>}
        <UserCardList users={users} />
      </div>
    </animated.div>
  )
}

export default App