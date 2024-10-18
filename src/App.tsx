"use client"

import React, { useState, useCallback } from "react"
import { ImageIcon, VideoIcon, UploadIcon, DownloadIcon } from "lucide-react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as SliderPrimitive from "@radix-ui/react-slider"
import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import UploadImage from "./lib/utils/UploadImage";
import {ImageTransform} from "./lib/utils/TransformImage";

// Define the cn function
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
console.log("Cloud name : ", process.env)
console.log("Cloud name : ", process.env.PUBLIC_CLOUDINARY_CLOUD_NAME)
const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            className
        )}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}
>(({ className, variant = "default", ...props }, ref) => {
  return (
      <button
          className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              {
                "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
                "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
                "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
                "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                "text-primary underline-offset-4 hover:underline": variant === "link",
              },
              className
          )}
          ref={ref}
          {...props}
      />
  )
})
Button.displayName = "Button"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

type MediaType = "image" | "video"
// Function to be passed to the child
export default function VectorizeClone() {
  const [mediaType, setMediaType] = useState<MediaType>("image")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [sliderValue, setSliderValue] = useState(1)

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }, [])




  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [])



  const handleAction = useCallback(() => {
    if (file) {
      if (mediaType === "image") {
        console.log("Performing action with image:", file.name, "Slider value:", sliderValue)
        // Add your image processing logic here

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
    if (file && preview) {
      const link = document.createElement('a')
      link.href = preview
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [file, preview])

  return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Vectorize Clone</h1>
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
              {file && preview && (
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
            {preview ? (
                <>
                  <img src={preview} alt="Uploaded preview" className="max-w-full max-h-[400px] object-contain mb-4" />
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