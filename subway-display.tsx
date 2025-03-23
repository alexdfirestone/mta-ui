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

export default function SubwayDisplay() {
  const [data, setData] = useState<SubwayData | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedStation, setSelectedStation] = useState("Union Square")
  const [loading, setLoading] = useState(false)

  // In a real app, you would fetch this data from your API based on the selected station
  useEffect(() => {
    const fetchStationData = async () => {
      setLoading(true)

      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Sample data would be fetched from API in real implementation
      // This would change based on the selected station
      const sampleData: SubwayData = {
        station: selectedStation,
        timestamp: "2025-03-16T23:19:43.619485",
        formatted_time: "11:19:43 PM, March 16, 2025",
        lines: {
          "456": {
            name: "4/5/6 Trains (Lexington Avenue Line)",
            uptown: [
              {
                route_id: "6",
                direction: "Uptown/Bronx",
                arrival_time: 1742181745,
                arrival_time_formatted: "11:22:25 PM",
                minutes_away: 2,
              },
              {
                route_id: "4",
                direction: "Uptown/Bronx",
                arrival_time: 1742182373,
                arrival_time_formatted: "11:32:53 PM",
                minutes_away: 13,
              },
              {
                route_id: "6",
                direction: "Uptown/Bronx",
                arrival_time: 1742182650,
                arrival_time_formatted: "11:37:30 PM",
                minutes_away: 17,
              },
            ],
            downtown: [
              {
                route_id: "6",
                direction: "Downtown/Brooklyn",
                arrival_time: 1742181922,
                arrival_time_formatted: "11:25:22 PM",
                minutes_away: 5,
              },
              {
                route_id: "4",
                direction: "Downtown/Brooklyn",
                arrival_time: 1742182275,
                arrival_time_formatted: "11:31:15 PM",
                minutes_away: 11,
              },
              {
                route_id: "6",
                direction: "Downtown/Brooklyn",
                arrival_time: 1742182915,
                arrival_time_formatted: "11:41:55 PM",
                minutes_away: 22,
              },
            ],
          },
          nqrw: {
            name: "N/Q/R/W Trains (Broadway Line)",
            uptown: [
              {
                route_id: "R",
                direction: "Uptown/Bronx",
                arrival_time: 1742181811,
                arrival_time_formatted: "11:23:31 PM",
                minutes_away: 3,
              },
              {
                route_id: "N",
                direction: "Uptown/Bronx",
                arrival_time: 1742182531,
                arrival_time_formatted: "11:35:31 PM",
                minutes_away: 15,
              },
              {
                route_id: "R",
                direction: "Uptown/Bronx",
                arrival_time: 1742182549,
                arrival_time_formatted: "11:35:49 PM",
                minutes_away: 16,
              },
            ],
            downtown: [
              {
                route_id: "Q",
                direction: "Downtown/Brooklyn",
                arrival_time: 1742181654,
                arrival_time_formatted: "11:20:54 PM",
                minutes_away: 1,
              },
              {
                route_id: "N",
                direction: "Downtown/Brooklyn",
                arrival_time: 1742182049,
                arrival_time_formatted: "11:27:29 PM",
                minutes_away: 7,
              },
              {
                route_id: "Q",
                direction: "Downtown/Brooklyn",
                arrival_time: 1742182620,
                arrival_time_formatted: "11:37:00 PM",
                minutes_away: 17,
              },
            ],
          },
          l: {
            name: "L Trains (Canarsie Line)",
            westbound: [
              {
                route_id: "L",
                direction: "To 8 Ave",
                arrival_time: 1742181762,
                arrival_time_formatted: "11:22:42 PM",
                minutes_away: 2,
              },
              {
                route_id: "L",
                direction: "To 8 Ave",
                arrival_time: 1742182153,
                arrival_time_formatted: "11:29:13 PM",
                minutes_away: 9,
              },
              {
                route_id: "L",
                direction: "To 8 Ave",
                arrival_time: 1742182735,
                arrival_time_formatted: "11:38:55 PM",
                minutes_away: 19,
              },
            ],
            eastbound: [
              {
                route_id: "L",
                direction: "To Canarsie",
                arrival_time: 1742181780,
                arrival_time_formatted: "11:23:00 PM",
                minutes_away: 3,
              },
              {
                route_id: "L",
                direction: "To Canarsie",
                arrival_time: 1742182380,
                arrival_time_formatted: "11:33:00 PM",
                minutes_away: 13,
              },
              {
                route_id: "L",
                direction: "To Canarsie",
                arrival_time: 1742182980,
                arrival_time_formatted: "11:43:00 PM",
                minutes_away: 23,
              },
            ],
          },
        },
        all_trains: [
          {
            route_id: "Q",
            direction: "Downtown/Brooklyn",
            arrival_time: 1742181654,
            arrival_time_formatted: "11:20:54 PM",
            minutes_away: 1,
          },
          {
            route_id: "6",
            direction: "Uptown/Bronx",
            arrival_time: 1742181745,
            arrival_time_formatted: "11:22:25 PM",
            minutes_away: 2,
          },
          {
            route_id: "L",
            direction: "To 8 Ave",
            arrival_time: 1742181762,
            arrival_time_formatted: "11:22:42 PM",
            minutes_away: 2,
          },
        ],
      }

      // For Times Square, add 1/2/3 and 7 trains
      if (selectedStation === "Times Square") {
        sampleData.lines["123"] = {
          name: "1/2/3 Trains (Broadway-7th Avenue Line)",
          uptown: [
            {
              route_id: "1",
              direction: "Uptown/Bronx",
              arrival_time: 1742181800,
              arrival_time_formatted: "11:23:20 PM",
              minutes_away: 3,
            },
            {
              route_id: "2",
              direction: "Uptown/Bronx",
              arrival_time: 1742182100,
              arrival_time_formatted: "11:28:20 PM",
              minutes_away: 8,
            },
          ],
          downtown: [
            {
              route_id: "3",
              direction: "Downtown/Brooklyn",
              arrival_time: 1742181700,
              arrival_time_formatted: "11:21:40 PM",
              minutes_away: 2,
            },
            {
              route_id: "1",
              direction: "Downtown/Brooklyn",
              arrival_time: 1742182200,
              arrival_time_formatted: "11:30:00 PM",
              minutes_away: 10,
            },
          ],
        }

        sampleData.lines["7"] = {
          name: "7 Train (Flushing Line)",
          westbound: [
            {
              route_id: "7",
              direction: "To Hudson Yards",
              arrival_time: 1742181750,
              arrival_time_formatted: "11:22:30 PM",
              minutes_away: 2,
            },
          ],
          eastbound: [
            {
              route_id: "7",
              direction: "To Flushing",
              arrival_time: 1742181850,
              arrival_time_formatted: "11:24:10 PM",
              minutes_away: 4,
            },
          ],
        }

        // Add these trains to all_trains
        sampleData.all_trains.push(
          {
            route_id: "1",
            direction: "Uptown/Bronx",
            arrival_time: 1742181800,
            arrival_time_formatted: "11:23:20 PM",
            minutes_away: 3,
          },
          {
            route_id: "3",
            direction: "Downtown/Brooklyn",
            arrival_time: 1742181700,
            arrival_time_formatted: "11:21:40 PM",
            minutes_away: 2,
          },
          {
            route_id: "7",
            direction: "To Hudson Yards",
            arrival_time: 1742181750,
            arrival_time_formatted: "11:22:30 PM",
            minutes_away: 2,
          },
          {
            route_id: "7",
            direction: "To Flushing",
            arrival_time: 1742181850,
            arrival_time_formatted: "11:24:10 PM",
            minutes_away: 4,
          },
        )

        // Sort all_trains by minutes_away
        sampleData.all_trains.sort((a, b) => a.minutes_away - b.minutes_away)
      }

      // For Grand Central, add 7 train and S shuttle
      if (selectedStation === "Grand Central") {
        sampleData.lines["7"] = {
          name: "7 Train (Flushing Line)",
          westbound: [
            {
              route_id: "7",
              direction: "To Hudson Yards",
              arrival_time: 1742181750,
              arrival_time_formatted: "11:22:30 PM",
              minutes_away: 2,
            },
          ],
          eastbound: [
            {
              route_id: "7",
              direction: "To Flushing",
              arrival_time: 1742181850,
              arrival_time_formatted: "11:24:10 PM",
              minutes_away: 4,
            },
          ],
        }

        sampleData.lines["s"] = {
          name: "S Train (42 St Shuttle)",
          westbound: [
            {
              route_id: "S",
              direction: "To Times Square",
              arrival_time: 1742181700,
              arrival_time_formatted: "11:21:40 PM",
              minutes_away: 1,
            },
            {
              route_id: "S",
              direction: "To Times Square",
              arrival_time: 1742182000,
              arrival_time_formatted: "11:26:40 PM",
              minutes_away: 6,
            },
          ],
          eastbound: [],
        }

        // Add these trains to all_trains
        sampleData.all_trains.push(
          {
            route_id: "S",
            direction: "To Times Square",
            arrival_time: 1742181700,
            arrival_time_formatted: "11:21:40 PM",
            minutes_away: 1,
          },
          {
            route_id: "7",
            direction: "To Hudson Yards",
            arrival_time: 1742181750,
            arrival_time_formatted: "11:22:30 PM",
            minutes_away: 2,
          },
          {
            route_id: "7",
            direction: "To Flushing",
            arrival_time: 1742181850,
            arrival_time_formatted: "11:24:10 PM",
            minutes_away: 4,
          },
          {
            route_id: "S",
            direction: "To Times Square",
            arrival_time: 1742182000,
            arrival_time_formatted: "11:26:40 PM",
            minutes_away: 6,
          },
        )

        // Sort all_trains by minutes_away
        sampleData.all_trains.sort((a, b) => a.minutes_away - b.minutes_away)
      }

      setData(sampleData)
      setLoading(false)
    }

    fetchStationData()

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [selectedStation])

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
        {Object.entries(data.lines).map(([lineKey, lineData]) => (
          <div key={lineKey} className="border border-amber-500 p-4">
            <h2 className="text-xl font-bold mb-4">{lineData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Uptown/Westbound */}
              {(lineData.uptown || lineData.westbound) && (
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {lineData.uptown ? "UPTOWN / BRONX" : "TO 8 AVE"}
                    {lineKey === "7" && lineData.westbound && "TO HUDSON YARDS"}
                    {lineKey === "s" && lineData.westbound && "TO TIMES SQUARE"}
                  </h3>
                  <div className="space-y-2">
                    {(lineData.uptown || lineData.westbound)?.slice(0, 3).map((train, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`${LINE_COLORS[train.route_id]} text-white font-bold w-8 h-8 flex items-center justify-center rounded-full`}
                        >
                          {train.route_id}
                        </div>
                        <span className="text-xl font-bold">{train.minutes_away} min</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downtown/Eastbound */}
              {(lineData.downtown || lineData.eastbound) && (
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {lineData.downtown ? "DOWNTOWN / BROOKLYN" : "TO CANARSIE"}
                    {lineKey === "7" && lineData.eastbound && "TO FLUSHING"}
                  </h3>
                  <div className="space-y-2">
                    {(lineData.downtown || lineData.eastbound)?.slice(0, 3).map((train, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`${LINE_COLORS[train.route_id]} text-white font-bold w-8 h-8 flex items-center justify-center rounded-full`}
                        >
                          {train.route_id}
                        </div>
                        <span className="text-xl font-bold">{train.minutes_away} min</span>
                      </div>
                    ))}
                    {/* If no trains in this direction */}
                    {(lineData.downtown || lineData.eastbound)?.length === 0 && (
                      <div className="text-xl">No trains scheduled</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

