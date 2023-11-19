import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import Admin from "./pages/Admin";
import Login from "./pages/Forms/Login";
import Signup from "./pages/Forms/Signup";
import "./App.css";
import Footer from "./components/Footer";
import PostDetails from "./pages/PostDetails";
import UpdatePostDetails from "./pages/UpdatePostDetails";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Users from "./pages/AdminTables/Users";
import Posts from "./pages/AdminTables/Posts";
import Comments from "./pages/AdminTables/Comments";
import Categories from "./pages/AdminTables/Categories";
import Forgout from "./pages/Forms/Forgout";
import Reset from "./pages/Forms/Reset";
import NotFound from "./pages/NotFound";
import { ueSelector, useSelector } from "react-redux";
import EmailVerify from "./pages/EmailVerify";
function App() {
  const {user} = useSelector(state => state.auth)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="posts">
          <Route index element={<Post />} />
          <Route path="createPost" element={user ? <CreatePost /> : <Navigate to="/" />} />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="details/update/:id" element={<UpdatePostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="adminDashboard">
          <Route index element={user?.isAdmin ? <Admin /> : <Navigate to="/" /> } />
          <Route path="usersTable" element={user?.isAdmin ? <Users /> : <Navigate to="/" />} />
          <Route path="postsTable" element={user?.isAdmin ? <Posts /> : <Navigate to="/" />} />
          <Route path="commentsTable" element={user?.isAdmin ? <Comments /> : <Navigate to="/" /> } />
          <Route path="categoriesTable" element={<Categories />} />
        </Route>

        <Route path="/resetPassword/:userId/:token" element={<Reset />} />
        <Route path="/forgotPassword" element={<Forgout />} />
        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/users/:userId/verify/:token" element={!user ? <EmailVerify /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
