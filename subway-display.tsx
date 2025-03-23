"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define types for our data
interface Train {
  route_id: string
  direction: string
  arrival_time: number
  arrival_time_formatted: string
  minutes_away: number
}

interface LineData {
  name: string
  uptown?: Train[]
  downtown?: Train[]
  westbound?: Train[]
  eastbound?: Train[]
}

interface SubwayData {
  station: string
  timestamp: string
  formatted_time: string
  lines: {
    [key: string]: LineData
  }
  all_trains: Train[]
}

// Train line colors
const LINE_COLORS: Record<string, string> = {
  "1": "bg-red-600",
  "2": "bg-red-600",
  "3": "bg-red-600",
  "4": "bg-green-600",
  "5": "bg-green-600",
  "6": "bg-green-600",
  "7": "bg-purple-600",
  A: "bg-blue-600",
  C: "bg-blue-600",
  E: "bg-blue-600",
  B: "bg-orange-500",
  D: "bg-orange-500",
  F: "bg-orange-500",
  M: "bg-orange-500",
  N: "bg-yellow-500",
  Q: "bg-yellow-500",
  R: "bg-yellow-500",
  W: "bg-yellow-500",
  G: "bg-lime-500",
  J: "bg-brown-500",
  Z: "bg-brown-500",
  L: "bg-gray-600",
  S: "bg-gray-500",
}

// Available stations
const STATIONS = [
  "Union Square",
  "Times Square",
  "Grand Central",
  "Atlantic Avenue",
  "Herald Square",
  "Columbus Circle",
  "Fulton Street",
]

// Maximum number of trains to display per direction
const MAX_TRAINS_PER_DIRECTION = 8

export default function SubwayDisplay() {
  const [data, setData] = useState<SubwayData | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedStation, setSelectedStation] = useState<string>("Union Square")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedLines, setExpandedLines] = useState<Record<string, boolean>>({})

  // Convert station name to kebab-case for API
  const getStationSlug = (stationName: string) => {
    return stationName.toLowerCase().replace(/\s+/g, '-');
  }

  // Toggle expanded view for a line
  const toggleLineExpanded = (lineKey: string) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineKey]: !prev[lineKey]
    }))
  }

  // Fetch data from API
  const fetchStationData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Add checks for undefined values
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://mta-api-bn7y.onrender.com';
      const stationSlug: string = getStationSlug(selectedStation);

      const response = await fetch(`${apiUrl}/api/stations/${stationSlug}/trains`, {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error('Error fetching subway data:', err);
      setError('Failed to load subway data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStationData();

    // Set up refresh interval (every 30 seconds)
    const intervalId = setInterval(fetchStationData, 30000);

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timer);
    };
  }, [selectedStation]);

  if (error) {
    return (
      <div className="bg-black text-amber-500 min-h-screen font-mono flex justify-center items-center">
        <div className="text-2xl">{error}</div>
      </div>
    )
  }
  
  if (!data || loading) {
    return (
      <div className="bg-black text-amber-500 min-h-screen font-mono flex justify-center items-center">
        <div className="text-2xl">Loading {selectedStation} data...</div>
      </div>
    )
  }

  // Get next few trains across all lines
  const nextTrains = data.all_trains
    .filter((train) => train.minutes_away >= 0)
    .sort((a, b) => a.minutes_away - b.minutes_away)
    .slice(0, 6)

  return (
    <div className="bg-black text-amber-500 min-h-screen font-mono p-4">
      {/* Header with Station Selector */}
      <div className="border-b-2 border-amber-500 pb-2 mb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider">{data.station.toUpperCase()}</h1>
            <div className="w-full md:w-64">
              <Select value={selectedStation} onValueChange={(value) => setSelectedStation(value)}>
                <SelectTrigger className="bg-black border-amber-500 text-amber-500 focus:ring-amber-500">
                  <SelectValue placeholder="Select station" />
                </SelectTrigger>
                <SelectContent className="bg-black border-amber-500 text-amber-500">
                  {STATIONS.map((station) => (
                    <SelectItem key={station} value={station} className="focus:bg-amber-900 focus:text-amber-100">
                      {station}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Refresh Button */}
            <button 
              onClick={() => fetchStationData()} 
              className="text-amber-500 border border-amber-500 px-2 py-1 text-sm hover:bg-amber-500 hover:text-black"
            >
              REFRESH
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="text-xl">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Next Trains Display */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">NEXT TRAINS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nextTrains.map((train, index) => (
            <div key={index} className="border border-amber-500 p-3 flex items-center gap-3">
              <div
                className={`${LINE_COLORS[train.route_id] || "bg-blue-600"} text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-full`}
              >
                {train.route_id}
              </div>
              <div>
                <div className="text-lg">{train.direction}</div>
                <div className="flex gap-2 items-center">
                  <span className="text-2xl font-bold">{train.minutes_away} min</span>
                  <span className="text-sm">({train.arrival_time_formatted})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Sections */}
      <div className="space-y-8">
        {/* Render each line section */}
        {Object.entries(data.lines).map(([lineKey, lineData]) => {
          const isExpanded = expandedLines[lineKey] || false;
          
          // Determine which directions are available for this line
          const hasUptown = lineData.uptown && lineData.uptown.length > 0;
          const hasDowntown = lineData.downtown && lineData.downtown.length > 0;
          const hasWestbound = lineData.westbound && lineData.westbound.length > 0;
          const hasEastbound = lineData.eastbound && lineData.eastbound.length > 0;
          
          // Get correct trains based on direction
          const northTrains = hasUptown ? lineData.uptown : (hasWestbound ? lineData.westbound : []);
          const southTrains = hasDowntown ? lineData.downtown : (hasEastbound ? lineData.eastbound : []);
          
          // Set display limit based on expanded state
          const displayLimit = isExpanded ? MAX_TRAINS_PER_DIRECTION : 3;
          
          // Get direction labels
          const northLabel = hasUptown ? "UPTOWN / BRONX" : 
                            (lineKey === "L" && hasWestbound ? "TO 8 AVE" :
                            (lineKey === "7" && hasWestbound ? "TO HUDSON YARDS" : 
                            (lineKey === "S" && hasWestbound ? "TO TIMES SQUARE" : "WESTBOUND")));
                            
          const southLabel = hasDowntown ? "DOWNTOWN / BROOKLYN" : 
                            (lineKey === "L" && hasEastbound ? "TO CANARSIE" :
                            (lineKey === "7" && hasEastbound ? "TO FLUSHING" : "EASTBOUND"));

          return (
            <div key={lineKey} className="border border-amber-500 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{lineData.name}</h2>
                {(northTrains && northTrains.length > 3 || southTrains && southTrains.length > 3) && (
                  <button 
                    onClick={() => toggleLineExpanded(lineKey)}
                    className="text-amber-500 border border-amber-500 px-2 py-1 text-sm hover:bg-amber-500 hover:text-black"
                  >
                    {isExpanded ? "SHOW LESS" : "SHOW MORE"}
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Uptown/Westbound */}
                {northTrains && northTrains.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">{northLabel}</h3>
                    <div className="space-y-2">
                      {northTrains.slice(0, displayLimit).map((train, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className={`${LINE_COLORS[train.route_id]} text-white font-bold w-8 h-8 flex items-center justify-center rounded-full`}
                          >
                            {train.route_id}
                          </div>
                          <span className="text-xl font-bold">{train.minutes_away} min</span>
                          <span className="text-sm">({train.arrival_time_formatted})</span>
                        </div>
                      ))}
                      {northTrains.length === 0 && (
                        <div className="text-xl">No trains scheduled</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Downtown/Eastbound */}
                {southTrains && southTrains.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">{southLabel}</h3>
                    <div className="space-y-2">
                      {southTrains.slice(0, displayLimit).map((train, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className={`${LINE_COLORS[train.route_id]} text-white font-bold w-8 h-8 flex items-center justify-center rounded-full`}
                          >
                            {train.route_id}
                          </div>
                          <span className="text-xl font-bold">{train.minutes_away} min</span>
                          <span className="text-sm">({train.arrival_time_formatted})</span>
                        </div>
                      ))}
                      {southTrains.length === 0 && (
                        <div className="text-xl">No trains scheduled</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}