# Why I made this

I was in charge of marketing for growing a brand's TikTok, and after becoming quick at making slides and content and posting, the cropping of the images (especially when the backgrounds were paintings and I didn't want to cut any pixels) became the most strenuous part of the process. So I made an automatic image cropper to both shorten the process and make it more precise.

## Project Overview

A React-based web application that automatically detects and removes unnecessary background areas (like black or white bars) from images.

Auto Image Cropper allows users to select images from their device or take photos with their camera, then automatically crops out solid-colored borders around the content. This tool is particularly useful for:

- Marketing professionals who need to quickly crop slides for social media
- Artists who want to remove borders around their work
- Anyone who regularly needs to prepare images for posting online

## Features

- **Image Selection**: Upload images from your device's gallery or camera roll
- **Camera Capture**: Take photos directly with your device's camera (mobile)
- **Smart Detection**: Automatically identifies black and white border areas
- **Customisable Settings**:
  - Adjust colour tolerance for better detection
  - Toggle between detecting black backgrounds, white backgrounds, or both
- **Preview**: See before and after comparison of your images
- **Download**: Save your cropped images directly to your device

## How It Works

The heart of this application is a custom-built algorithm that analyzes images pixel by pixel to identify and remove uniform background areas:

1. The algorithm scans the image from all four edges (top, right, bottom, left)
2. It identifies areas that consist primarily of black or white pixels
3. When it detects a transition to non-background content, it marks that as the crop boundary
4. The image is then cropped to these detected boundaries

The algorithm uses thresholds and tolerance settings to ensure accurate cropping even when the background isn't perfectly uniform.

## Technologies Used

- JavaScript for the core cropping algorithm
- React for the frontend interface
- HTML5 Canvas API for image manipulation
- CSS for styling and responsive design

## Installation and Usage

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open `http://localhost:3000` in your browser