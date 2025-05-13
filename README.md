# Mentor-Connect

## Project Overview

Mentor Connect is a comprehensive mentorship platform developed as part of the Smart India Hackathon 2024. It aims to bridge the gap between mentors and mentees, catering to users' needs for progress, skill-building, and personal concerns. This platform provides a user-friendly interface for connecting mentors with mentees, facilitating knowledge sharing, and promoting personal and professional growth.

### Features

- Data-driven algorithm for matching mentors and mentees
- Automated calendar booking system
- Embedded video call and chat features
- Integrated all-in-one platform
- Personal guidance
- Skill development resources
- Resource library
- Gamification and rewards system
- Reverse mentoring opportunities
- Recorded sessions for future uses

### Setup Instructions

#### Frontend

To set up this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/AnishSarkar22/SIH-2024.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mentor-connect
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables (if applicable) in the root directory.

5. Build the project:

   ```bash
   npm run build
   ```

#### Backend

1. Go to backend folder:

   ```bash
   cd backend
   ```

2. Set up environment variables (if applicable).

3. Set up the Python virtual enviornment:

   1. Make sure Python is installed:

      ```bash
      # macOS/Linux
      python3 --version
      
      # Windows
      python --version
      ```

   2. Create a virtual environment:

      ```bash
      # macOS/Linux
      python3 -m venv venv
      
      # Windows
      python -m venv venv
      ```

   3. Activate the virtual enviornment:

      ```bash
      # macOS/Linux
      source venv/bin/activate
      
      # Windows
      .\venv\Scripts\activate
      ```

   4. Install Python dependencies:

      ```bash
      # Same for all platforms
      pip install -r requirements.txt
      ```

   5. To deactivate the virtual environment when done:

      ```bash
      # Same for all platforms
      deactivate
      ```

4. Start the Backend server:

   ```bash
   python3 server.py
   ```

### Technologies Used

#### For Frontend

- React
- Vite
- Tailwind CSS

#### For Backend

- Flask
- Firestore Realtime Listeners

#### APIs and Services

- GetStream
- Cal.com
- OpenAI

#### Machine Learning

- TensorFlow
- PyTorch
- NumPy
- spaCy

#### Deployment

- Amazon EC2
- Firebase

### Demo

Check out the live demo: [Mentor Connect Live Demo](https://mentor-connect-live-demo-url.com)

### Contributions

We welcome contributions to the Mentor Connect project. If you'd like to contribute, please follow these steps:

- 1.Fork the repository.
- 2.Create a new branch:

  ```bash
  git checkout -b feature/your-feature-name
  ```

- 3.Make your changes.
- 4.Commit your changes:

  ```bash
  git commit -am 'Add some feature'
  ```

- 5.Push to the branch:

  ```bash
  git push origin feature/your-feature-name
  ```

- 6.Create a new Pull Request.
Happy Coding

Please ensure your code adheres to our coding standards and include tests for new features.

### License

This project is licensed under the MIT License - see [LICENSE.md](https://github.com/AnishSarkar22/SIH-2024/blob/main/LICENSE.md).
