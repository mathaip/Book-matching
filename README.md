# Book Recommendation System

This project is a simple Book Recommendation System that matches users with books based on their preferences.

## Overview

The system allows users to input their preferences through a form, and the backend performs a matching algorithm to recommend a book that best fits the user's criteria.
Live Demo: https://book-matching-dot-fluency-403011.uc.r.appspot.com/
## Technologies Used

- Frontend: React
- Backend: FastAPI
- Database: In-memory (for demonstration purposes)

## Project Structure

- `frontend/`: Contains the React-based frontend code.
- `backend/`: Contains the FastAPI backend code.
- `assets/`: Holds static assets like book images.

## How to Run

### Frontend

1. Navigate to the `frontend/` directory.
2. Install dependencies: `npm install`
3. Change line 70 in app.jsx to const url = "http://localhost:8080/match"
3. Start the development server: `npm start`
4. Open your browser and go to [http://localhost:3000](http://localhost:3000)

### Backend

1. Navigate to the `backend/` directory.
2. Install dependencies: `pip install -r requirements.txt`
3. Run the FastAPI server: `uvicorn main:app --reload`
4. The backend will be available at [http://localhost:8080](http://localhost:8080)

## How the Matching Works

The backend uses a simple matching algorithm based on the user's preferences and book criteria. The matching algorithm considers factors such as genre, reading level, and user input vectors to recommend a book.

### Algorithm Steps:

1. Extract user input vectors based on preferences.
2. Calculate scores for each book based on genre, reading level, and user input vectors.
3. Identify the book with the minimum score as the closest match.
4. Return the matched book information.
5. if you want to see the matching vector scores you can view in the console logs
