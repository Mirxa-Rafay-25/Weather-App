"use client"

import { useState } from "react"
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"

export default function Home() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name")
      return
    }

    setLoading(true)
    setError("")

    try {
      const API_KEY = "e8e6d657b19f76e087ea220268a515bb" // Replace with your own API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      )

      if (!response.ok) {
        throw new Error("City not found")
      }

      const data = await response.json()

      setWeather({
        name: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility / 1000,
        pressure: data.main.pressure,
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon,
      })
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Weather App</h1>
          <div className="flex items-center gap-4">
            <Link href="/user-details">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                User Details
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-xl">Search Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </form>
            {error && <p className="text-red-300 mt-2 text-sm">{error}</p>}
          </CardContent>
        </Card>

        {/* Weather Display */}
        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Weather Card */}
            <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg font-semibold">
                      {weather.name}, {weather.country}
                    </span>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    className="w-16 h-16"
                  />
                </div>

                <div className="text-center mb-6">
                  <div className="text-6xl md:text-7xl font-bold text-white mb-2">{weather.temperature}°C</div>
                  <div className="text-white/80 text-lg capitalize">{weather.description}</div>
                  <div className="text-white/70 text-sm mt-1">Feels like {weather.feelsLike}°C</div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Details */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Weather Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-300" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-semibold">{weather.humidity}%</span>
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-green-300" />
                    <span>Wind Speed</span>
                  </div>
                  <span className="font-semibold">{weather.windSpeed} m/s</span>
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-300" />
                    <span>Visibility</span>
                  </div>
                  <span className="font-semibold">{weather.visibility} km</span>
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-orange-300" />
                    <span>Pressure</span>
                  </div>
                  <span className="font-semibold">{weather.pressure} hPa</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Welcome Message */}
        {!weather && !loading && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <Thermometer className="h-16 w-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Weather App</h2>
              <p className="text-white/80">Enter a city name above to get current weather information</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}