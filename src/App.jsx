import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Classes from './components/Classes';
import Message from './components/Message';
import Chat from './components/Chat';
import MChat from './components/MChat';
import Home from './components/Home';
import Profile from './components/Profile';
import MProfile from './components/MProfile';
import Statistics from './components/Statistics';
import MStatistics from './components/MStatistics';
import Notification from './components/Notification';
import MNotification from './components/MNotification';
import Setting from './components/Setting';
import MSetting from './components/MSetting';
import MDashboard from './components/MDashboard';
import MMessage from './components/MMessage';
import Mentor from './components/Mentor';
import Leaderboard from './components/Leaderboard';
import Signin from './components/Signin';
import SignUp from './components/Signup';
import AboutUs from './components/AboutUs';
// import HNavbar from './components/HNavbar';
import BasicDetails from './components/BasicDetails';
import ApplyMentor from './components/ApplyMentor';
import Blog from './components/blog';
import Personal_AI from './components/Personal_AI';
import MPersonal_AI from './components/MPersonal_AI';
import Quiz from './components/Quiz';
import Resource from './components/Resource';
import MSchedule from './components/MSchedule';
// import PrivateRoute from './components/PrivateRoute'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
        
        {/* Protected Routes */}
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/mentor-dashboard" element={<PrivateRoute><MDashboard /></PrivateRoute>} />
        <Route path="/classes" element={<PrivateRoute><Classes /></PrivateRoute>} />
        <Route path="/message" element={<PrivateRoute><Message /></PrivateRoute>} />
        <Route path="/mentor-message" element={<PrivateRoute><MMessage /></PrivateRoute>} />
        <Route path="/chat/:chatId" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/mentor-chat/:chatId" element={<PrivateRoute><MChat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/mentor-profile" element={<PrivateRoute><MProfile /></PrivateRoute>} />
        <Route path="/profile/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
        <Route path="/mentor-profile/statistics" element={<PrivateRoute><MStatistics /></PrivateRoute>} />
        <Route path="/profile/notifications" element={<PrivateRoute><Notification /></PrivateRoute>} />
        <Route path="/mentor-profile/notifications" element={<PrivateRoute><MNotification /></PrivateRoute>} />
        <Route path="/profile/settings" element={<PrivateRoute><Setting /></PrivateRoute>} />
        <Route path="/mentor-profile/settings" element={<PrivateRoute><MSetting /></PrivateRoute>} />
        <Route path="/mentors" element={<PrivateRoute><Mentor /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} /> */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mentor-dashboard" element={<MDashboard />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/message" element={<Message />} />
        <Route path="/mentor-message" element={<MMessage />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/mentor-chat/:chatId" element={<MChat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentor-profile" element={<MProfile />} />
        <Route path="/profile/statistics" element={<Statistics />} />
        <Route path="/mentor-profile/statistics" element={<MStatistics />} />
        <Route path="/profile/notifications" element={<Notification />} />
        <Route path="/mentor-profile/notifications" element={<MNotification />} />
        <Route path="/profile/settings" element={<Setting />} />
        <Route path="/mentor-profile/settings" element={<MSetting />} />
        <Route path="/mentors" element={<Mentor />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/basic-details" element={<BasicDetails />} />
        <Route path="/apply-mentor" element={<ApplyMentor />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/personal-ai" element={<Personal_AI />} /> {/* Added route for Personal_AI */}
        <Route path="/mpersonal-ai" element={<MPersonal_AI />} /> {/* Added route for MPersonal_AI */}
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/mentor-schedule" element={<MSchedule />} />

          {/* Redirect to home if route does not exist */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;