import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Mentee/Dashboard';
import Classes from './components/Mentee/Classes';
import Message from './components/Mentee/Message And Chat/Message';
import Chat from './components/Mentee/Message And Chat/Chat';
import MChat from './components/Mentor/Message And Chat/MChat';
import Home from './components/Home/Home';
import Profile from './components/Mentee/Profile/Profile';
import MProfile from './components/Mentor/Profile/MProfile';
import Statistics from './components/Mentee/Profile/Statistics';
import MStatistics from './components/Mentor/Profile/MStatistics';
import Notification from './components/Mentee/Profile/Notification';
import MNotification from './components/Mentor/Profile/MNotification';
import Setting from './components/Mentee/Profile/Setting';
import MSetting from './components/Mentor/Profile/MSetting';
import MDashboard from './components/Mentor/MDashboard';
import MMessage from './components/Mentor/Message And Chat/MMessage';
import Mentor from './components/Mentee/Mentor Option/Mentor';
import Leaderboard from './components/Mentee/Leaderboard/Leaderboard';
import Signin from './components/Login and Signup/Signin';
import SignUp from './components/Login and Signup/Signup';
import AboutUs from './components/AboutUs/AboutUs';
// import HNavbar from './components/HNavbar';
import ApplyMentor from './components/Apply Mentor/ApplyMentor';
import Blog from './components/Blog/blog';
import Personal_AI from './components/Mentee/Message And Chat/Personal_AI';
import MPersonal_AI from './components/Mentor/Message And Chat/MPersonal_AI';
import Quiz from './components/Mentee/Leaderboard/Quiz';
import Resource from './components/Mentee/Resource';
import MSchedule from './components/Mentor/MSchedule';
import VideoCall from './components/VideoCall';
import MentorBooking from './components/MentorBooking';
import BasicDetails2 from './components/BasicDetails/BasicDetails2';
import Mentorprofile from './components/Mentee/Mentor Details/Mentorprofile';

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
        <Route path="/explore" element={<PrivateRoute><Mentor /></PrivateRoute>} />
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
        <Route path="/explore" element={<Mentor />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/apply-mentor" element={<ApplyMentor />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/personal-ai" element={<Personal_AI />} /> {/* Added route for Personal_AI */}
        <Route path="/mpersonal-ai" element={<MPersonal_AI />} /> {/* Added route for MPersonal_AI */}
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/mentor-schedule" element={<MSchedule />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/mentor-booking/:mentorId" element={<MentorBooking />} />
        <Route path="/basic-details" element={<BasicDetails2 />} />
        <Route path="/mentor-profile-details" element={<Mentorprofile />} />
        {/* Redirect to home if route does not exist */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;