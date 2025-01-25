# SPEAKXAI: Search Questions Application

## Overview

SPEAKXAI is a Reactjs-based web application powered with nodejs and grpc microservices that allows users to search for various types of questions like MCQs, content-only questions, and more. The app includes a filtering mechanism to customize searches and a dynamic pagination system for better navigation. 

## Features

- **Search Functionality**: Input queries to search for specific questions.
- **Question Types**: Filter by categories such as MCQ, Content Only, Read Along, Anagram, etc.
- **MCQ Questions**: Users can select an option and view the result.
- **Anagram Game**: Play an interactive game by rearranging letters into the correct order.
- **Dynamic Pagination**: Navigate through search results easily with a pagination system.
- **Responsive Design**: Optimized for a wide range of devices.
- **Skeleton Loading**: Seamless user experience with skeleton loaders during data fetching.
- **Google Protocol Buffers**: Efficient data serialization with gRPC.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: NodeJs and gRPC-based microservices
- **Others**: React-Icons, React-Loading-Skeleton

## Prerequisites

- **Node.js**: Ensure Node.js (v16 or above) is installed.
- **Docker & Docker Compose**: Required for containerized deployment.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SujalSharma-tech/speakxai.git
cd speakxai
```

### 2. Make a .env file by executing following command
```
echo "REACT_APP_ENVOY_URL=http://localhost:8000" > client/.env
```

### 3. Build and run Docker container
```
docker-compose up --build
```

## 4. Access the Application
```
Open your browser and navigate to http://localhost:8081
```

### 5. Stopping the Application
```
docker-compose down
```


Thank you for using this project.

