"use client"
import { Card, CardContent } from "@/components/ui/card"
import { VideoIcon, PlayIcon, PauseIcon } from "lucide-react"
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
      // Jump to the specific timestamp when video loads
      if (video.start > 0) {
        videoRef.current.currentTime = video.start
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

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)

  if (hasError || isPlaceholderUrl) {
    return (
      <div className="relative w-full aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center">
        <VideoIcon className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-3">
          {isPlaceholderUrl ? "Video preview not available" : "Video temporarily unavailable"}
        </p>
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
    </div>
  )
}

function VideoThumbnailCard({ video, onClick }: { video: VideoResult; onClick: () => void }) {
  return (
    <Card
      className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Thumbnail */}
          <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {video.thumbnailUrl.startsWith("/placeholder") ? (
              <div className="w-full h-full flex items-center justify-center">
                <VideoIcon className="w-6 h-6 text-gray-400" />
              </div>
            ) : (
              <img
                src={video.thumbnailUrl || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
              <PlayIcon className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
              {formatTimestamp(video.end - video.start)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">{video.title}</h4>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">{video.snippet || "No description available"}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{Math.round(video.confidence * 100)}% match</span>
              <span>•</span>
              <span>Starts at {formatTimestamp(video.start)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function VideoSearchResults({ searchResult, query }: VideoSearchResultsProps) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)

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

  const primaryVideo = searchResult.results[selectedVideoIndex]
  const otherVideos = searchResult.results.filter((_, index) => index !== selectedVideoIndex)

  return (
    <div className="space-y-6">
      {/* Primary video player */}
      <Card className="bg-white border-gray-200 shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Video title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{primaryVideo.title}</h3>
              {primaryVideo.snippet && <p className="text-sm text-gray-600 leading-relaxed">{primaryVideo.snippet}</p>}
            </div>

            {/* Video player */}
            <InlineVideoPlayer video={primaryVideo} index={selectedVideoIndex} />
          </div>
        </CardContent>
      </Card>

      {/* Other videos as thumbnail cards */}
      {otherVideos.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            {otherVideos.length} more relevant {otherVideos.length === 1 ? "result" : "results"}
          </h4>
          <div className="grid gap-3">
            {otherVideos.map((video, index) => {
              const originalIndex = searchResult.results.findIndex((v) => v.videoId === video.videoId)
              return (
                <VideoThumbnailCard
                  key={`${video.videoId}-${index}`}
                  video={video}
                  onClick={() => setSelectedVideoIndex(originalIndex)}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
