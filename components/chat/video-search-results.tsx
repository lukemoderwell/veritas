"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VideoIcon, ClockIcon, ExternalLinkIcon, PlayIcon, PauseIcon } from "lucide-react"
import { formatTimestamp } from "@/lib/formatTimestamp"
import { useState, useRef, useEffect } from "react"
import Hls from "hls.js"

interface VideoResult {
  videoId: string
  title: string
  confidence: number
  start: number
  end: number
  thumbnailUrl: string
  videoUrl: string
  snippet?: string
}

interface SearchResult {
  success: boolean
  results: VideoResult[]
  totalCount: number
  error?: string
}

interface VideoSearchResultsProps {
  searchResult: SearchResult
  query: string
}

function InlineVideoPlayer({ video, index }: { video: VideoResult; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Don't render video player for placeholder URLs
  const isPlaceholderUrl = video.videoUrl.startsWith("#")
  useEffect(() => {
    if (hasError || isPlaceholderUrl) return

    let hls: Hls | null = null

    const initializeHls = () => {
      if (videoRef.current) {
        const videoElement = videoRef.current
        if (Hls.isSupported()) {
          console.log("HLS.js is supported, initializing...")
          hls = new Hls()
          hls.loadSource(video.videoUrl)
          hls.attachMedia(videoElement)
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("HLS manifest parsed")
            setIsLoading(false)
            if (video.start > 0) {
              videoElement.currentTime = video.start
            }
          })
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error("HLS fatal error:", data)
              setHasError(true)
            }
          })
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          console.log("Native HLS is supported (e.g., Safari)")
          videoElement.src = video.videoUrl
          videoElement.addEventListener("loadedmetadata", () => {
            setIsLoading(false)
            if (video.start > 0) {
              videoElement.currentTime = video.start
            }
          })
        } else {
          console.error("HLS is not supported on this browser.")
          setHasError(true)
        }
      }
    }

    initializeHls()

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [video.videoUrl, video.start, hasError, isPlaceholderUrl])

  const handleLoadedData = () => {
    setIsLoading(false)
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      // Jump to the specific timestamp when video loads
      if (video.start > 0) {
        videoRef.current.currentTime = video.start
        setCurrentTime(video.start)
      }
    }
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const jumpToTimestamp = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp
      setCurrentTime(timestamp)
      if (!isPlaying) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)

  // Don't render video player for placeholder URLs

  if (hasError || isPlaceholderUrl) {
    return (
      <div className="relative w-full aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center">
        <VideoIcon className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-3">
          {isPlaceholderUrl ? "Video preview not available" : "Video temporarily unavailable"}
        </p>
        {!isPlaceholderUrl && (
          <Button variant="outline" size="sm" onClick={() => window.open(video.videoUrl, "_blank")} className="text-xs">
            <ExternalLinkIcon className="w-3 h-3 mr-1" />
            Open in new tab
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-600">Loading video...</p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onLoadedData={handleLoadedData}
          onError={handleError}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
          preload="metadata"
          crossOrigin="anonymous"
        >
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause overlay */}
        {!isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            onClick={togglePlayPause}
          >
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              {isPlaying ? (
                <PauseIcon className="w-8 h-8 text-gray-800" />
              ) : (
                <PlayIcon className="w-8 h-8 text-gray-800 ml-1" />
              )}
            </div>
          </div>
        )}

        {/* Confidence score overlay */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
          {Math.round(video.confidence * 100)}% match
        </div>
      </div>

      {/* Video controls */}
      <div className="flex items-center gap-3 mt-3 p-3 bg-gray-50 rounded-lg">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePlayPause}
          disabled={isLoading || hasError}
          className="text-xs font-medium"
        >
          {isPlaying ? (
            <>
              <PauseIcon className="w-3 h-3 mr-1" />
              Pause
            </>
          ) : (
            <>
              <PlayIcon className="w-3 h-3 mr-1" />
              Play
            </>
          )}
        </Button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ClockIcon className="w-4 h-4" />
          <span>Relevant segment:</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => jumpToTimestamp(video.start)}
          disabled={isLoading || hasError}
          className="text-xs font-medium"
        >
          Jump to {formatTimestamp(video.start)}
        </Button>

        {video.end > video.start && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => jumpToTimestamp(video.end)}
            disabled={isLoading || hasError}
            className="text-xs font-medium"
          >
            End at {formatTimestamp(video.end)}
          </Button>
        )}

        <div className="ml-auto text-xs text-gray-500">
          {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
        </div>
      </div>
    </div>
  )
}

export default function VideoSearchResults({ searchResult, query }: VideoSearchResultsProps) {
  if (!searchResult.success && searchResult.error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-yellow-800 text-sm">
          <strong>Search temporarily unavailable:</strong> {searchResult.error}
        </p>
        {searchResult.results.length > 0 && <p className="text-yellow-700 text-xs mt-1">Showing demo results below.</p>}
      </div>
    )
  }

  if (searchResult.results.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-gray-600 text-sm">
          No videos found for "{query}". Try rephrasing your search or contact your administrator.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <VideoIcon className="w-4 h-4" />
        <span>
          Found {searchResult.totalCount} relevant video{searchResult.totalCount !== 1 ? "s" : ""} (showing top{" "}
          {Math.min(3, searchResult.results.length)})
        </span>
      </div>

      {searchResult.results.map((video, index) => (
        <Card
          key={`${video.videoId}-${index}`}
          className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Video title and metadata */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                  {video.snippet && <p className="text-sm text-gray-600 leading-relaxed">{video.snippet}</p>}
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>
                    Video {index + 1} of {searchResult.results.length}
                  </div>
                  <div className="text-xs mt-1">{Math.round(video.confidence * 100)}% relevance</div>
                </div>
              </div>

              {/* Inline video player */}
              <InlineVideoPlayer video={video} index={index} />

              {/* Additional actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>
                    Segment: {formatTimestamp(video.start)} - {formatTimestamp(video.end)}
                  </span>
                  <span>•</span>
                  <span>Duration: {formatTimestamp(video.end - video.start)}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(video.videoUrl, "_blank")}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  <ExternalLinkIcon className="w-3 h-3 mr-1" />
                  Open full video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
