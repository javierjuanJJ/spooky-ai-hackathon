"use client"

import React, {useCallback, useState} from "react"
import {DownloadIcon, ImageIcon, UploadIcon, VideoIcon} from "lucide-react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as SliderPrimitive from "@radix-ui/react-slider"

import UploadImage from "./lib/utils/UploadImage";
import {ImageTransform} from "./lib/utils/TransformImage";
import UploadVideo from "./lib/utils/UploadVideo";
import {VideoTransform} from "./lib/utils/TransformVideo";
import {Tabs} from "./components/Tabs";
import {TabsList} from "./components/TabsList";
import {TabsTrigger} from "./components/TabsTrigger";
import {TabsContent} from "./components/TabsContent";
import {Button} from "./components/Button";
import {Slider} from "./components/Slider";
import {Card} from "./components/Card";
import {CardContent} from "./components/CardContent";


TabsList.displayName = TabsPrimitive.List.displayName

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

TabsContent.displayName = TabsPrimitive.Content.displayName

Button.displayName = "Button"

Card.displayName = "Card"

CardContent.displayName = "CardContent"

Slider.displayName = SliderPrimitive.Root.displayName

type MediaType = "image" | "video"
// Function to be passed to the child
export default function VectorizeClone() {
  const [mediaType, setMediaType] = useState<MediaType>("image")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [previewVideo, setPreviewVideo] = useState<string | null>(null)
  const [sliderValue, setSliderValue] = useState(1)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/"))) {
      setFile(droppedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        if (preview || previewVideo ){
          setPreview(reader.result as string)
        }
        else setPreviewVideo(reader.result as string)

      }
      reader.readAsDataURL(droppedFile)
    }
  }, [preview, previewVideo])




  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && (selectedFile.type.startsWith("image/") || selectedFile.type.startsWith("video/"))) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        if ( preview || previewVideo) {
          setPreview(reader.result as string)
        }
        else {
          setPreviewVideo(reader.result as string)
        }

      }
      reader.readAsDataURL(selectedFile)
    }
  }, [preview, previewVideo])



  const handleAction = useCallback(() => {

    if (file) {
      console.log("URL modificada: ",file.name, mediaType)
      if (mediaType === "image") {
        console.log("Performing action with image:", file.name, "Slider value:", sliderValue)
        // Add your image processing logic here
        setPreviewVideo(null)

        UploadImage(file, (data) => {
          if (data['secure_url']) {
            setPreview(data['secure_url'])

            ImageTransform(data, sliderValue, (response) => {
              console.log("URL modificada: ",response)
              //console.log("URL modificada: ",response)
              // setCldImagePreview(response)
              setPreview(response)
            })

          }


        })

      } else {
        console.log("Performing action with video:", file.name, "Slider value:", sliderValue)
        // Add your video processing logic here
        setPreview(null)

        UploadVideo(file, (data) => {
          if (data['secure_url']) {
            setPreviewVideo(data['secure_url'])
            console.log("URL modificada: ",data['secure_url'])
            VideoTransform(data, sliderValue, (response) => {
              console.log("URL modificada: ",response)
              setPreviewVideo(response)
            })

          }


        })

      }
    } else {
      console.log("No file selected")
    }
  }, [file, mediaType, sliderValue])

  const getSliderColor = useCallback((value: number) => {
    const hue = ((value - 1) / 9) * 120 // 0 for red, 120 for green
    return `hsl(${hue}, 100%, 50%)`
  }, [])

  const handleDownload = useCallback(() => {
    if (file && (preview || previewVideo)) {
      const p = preview ? preview : previewVideo;
      const link = document.createElement('a')
      link.href = p
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [file, preview, previewVideo])


  return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Transformer Image & Video</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Tabs defaultValue="image" onValueChange={(value) => setMediaType(value as MediaType)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="image">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Image
                </TabsTrigger>
                <TabsTrigger value="video">
                  <VideoIcon className="mr-2 h-4 w-4" />
                  Video
                </TabsTrigger>
              </TabsList>
              <TabsContent value="image">
                <Card>
                  <CardContent>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById("fileInput")?.click()}
                    >
                      <input
                          type="file"
                          id="fileInput"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileInput}
                      />
                      <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop an image here, or click to select a file
                      </p>
                    </div>
                    {file && (
                        <p className="mt-2 text-sm text-gray-600 text-center">
                          Selected file: {file.name}
                        </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="video">
                <Card>
                  <CardContent>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById("fileInput")?.click()}
                    >
                      <input
                          type="file"
                          id="fileInput"
                          className="hidden"
                          accept="video/*"
                          onChange={handleFileInput}
                      />
                      <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop a video here, or click to select a file
                      </p>
                    </div>
                    {file && (
                        <p className="mt-2 text-sm text-gray-600 text-center">
                          Selected file: {file.name}
                        </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="mt-6">
              <label htmlFor="slider" className="block text-sm font-medium text-gray-700 mb-2">
                Adjust Value (1-10)
              </label>
              <Slider
                  id="slider"
                  min={1}
                  max={10}
                  step={1}
                  value={[sliderValue]}
                  onValueChange={(value) => setSliderValue(value[0])}
                  className="w-full"
              />
              <div
                  className="w-full h-2 mt-2 rounded-full"
                  style={{ backgroundColor: getSliderColor(sliderValue) }}
              ></div>
              <p className="text-center mt-2">Selected value: {sliderValue}</p>
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                  className="flex-1"
                  onClick={handleAction}
                  disabled={!file}
                  style={{ backgroundColor: getSliderColor(sliderValue) }}
              >
                {mediaType === "image" ? "Process Image" : "Process Video"}
              </Button>

              {file && (preview || previewVideo) && (
                  <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleDownload}
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Download
                  </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
            {(preview || previewVideo) ? (
                <>
                  {mediaType === "image" ?
                      <>
                        <img src={preview} alt="Uploaded preview"
                             className="max-w-full max-h-[400px] object-contain mb-4"/>
                      </>
                      :
                      <>
                        <video className="max-w-full max-h-[400px] object-contain mb-4">
                          <source src={previewVideo} type="video/mp4"/>
                        </video>
                      </>}

                  <p className="text-sm text-gray-600">
                    {file?.name} - {(file?.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </>
            ) : (
                <div className="text-center p-6">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Image preview will appear here</p>

                </div>
            )}
          </div>
        </div>
      </div>
  )
}