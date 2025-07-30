import uvicorn

if __name__ == "__main__":
    print("Server is running at http://localhost:8000")
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
