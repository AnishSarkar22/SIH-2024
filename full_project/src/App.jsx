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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
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
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;