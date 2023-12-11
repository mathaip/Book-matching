from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np

app = FastAPI()


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000"],  # Add your localhost URL(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchRequest(BaseModel):
    answer1: str
    answer2: str

# Mock data (replace this with a real database)
# Books with scores for genre and reading level
books = [
    {"title": "The Girl with the Dragon Tattoo", "genre": "Mystery", "reading_level": "Advanced"},
    {"title": "Gone Girl", "genre": "Mystery", "reading_level": "Beginner"},
    {"title": "The Da Vinci Code", "genre": "Mystery", "reading_level": "Intermediate"},

    {"title": "Dune", "genre": "Science Fiction", "reading_level": "Advanced"},
    {"title": "Ender's Game", "genre": "Science Fiction", "reading_level": "Intermediate"},
    {"title": "Neuromancer", "genre": "Science Fiction", "reading_level": "Intermediate"},

    {"title": "The Hobbit", "genre": "Fantasy", "reading_level": "Beginner"},
    {"title": "Harry Potter and the Sorcerer's Stone", "genre": "Fantasy", "reading_level": "Intermediate"},
    {"title": "A Game of Thrones", "genre": "Fantasy", "reading_level": "Advanced"},

    {"title": "Pride and Prejudice", "genre": "Romance", "reading_level": "Intermediate"},
    {"title": "Outlander", "genre": "Romance", "reading_level": "Advanced"},
    {"title": "The Notebook", "genre": "Romance", "reading_level": "Beginner"},

    {"title": "The Book Thief", "genre": "Historical Fiction", "reading_level": "Advanced"},
    {"title": "All the Light We Cannot See", "genre": "Historical Fiction", "reading_level": "Advanced"},
    {"title": "The Pillars of the Earth", "genre": "Historical Fiction", "reading_level": "Advanced"},]
# Map genres to unique scores
genre_scores = {"Mystery": 8, "Fantasy": 6, "Romance": 10, "Historical Fiction": 12, "Science Fiction":4}

# Map reading levels to scores
reading_level_scores = {"Beginner": 3, "Intermediate": 5, "Advanced": 10}

@app.post("/match")
async def match(request: MatchRequest):
    print(request)
    reading_level = request.answer1
    genre = request.answer2
    
    user_vector = np.array([
        reading_level_scores[reading_level],
        genre_scores.get(genre, 0)
    ])
    
    # Calculate scores for books based on genre, reading level, and user input
    book_scores = np.array([
    np.linalg.norm([
        reading_level_scores[book["reading_level"]] - user_vector[0],
        genre_scores.get(book["genre"], 0) - user_vector[1]
    ], ord=1)
    for book in books
])
    
    # Get the index of the minimum score
    book_index = np.argmin(book_scores)
    
    # Get the closest matching book
    matched_book = books[book_index]
    
    # Calculate vector scores for user input and the matched book
    user_input_vector_score = np.linalg.norm(user_vector)
    matched_book_vector = np.array([
        reading_level_scores[matched_book["reading_level"]],
        genre_scores.get(matched_book["genre"], 0)
    ])
    matched_book_vector_score = np.linalg.norm(matched_book_vector)
    
    # Mock result (replace this with actual book data)
    book_result_dict = {
    "matched_book_title": matched_book['title'],
    "matched_book_genre": matched_book['genre'],
    "matched_book_reading_level": matched_book['reading_level'],
    "user_input_vector_score": user_input_vector_score,
    "matched_book_vector_score": matched_book_vector_score
}

    
    return {"result": book_result_dict}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)
