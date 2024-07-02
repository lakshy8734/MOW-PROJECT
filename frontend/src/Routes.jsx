// Routes.jsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./Component/Load/Load"; // Import the Loader component

const ProtectedRoute = lazy(() =>
  import("./pages/ProtectedRoute/ProtectedRoute")
);
const Home = lazy(() => import("./pages/Home/Home"));
const Register = lazy(() => import("./pages/Register/Register"));
const PasswordReset = lazy(() => import("./pages/PasswordReset/PasswordReset"));
const Contributor = lazy(() => import("./pages/Contributor/Contributor"));
const Blogs = lazy(() => import("./pages/Blogs/Blogs"));
const AdminVedio = lazy(() => import("./pages/AdminVedio/AdminVedio"));
const SubBlogs = lazy(() => import("./pages/SubBlogs/SubBlogs"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Members = lazy(() => import("./pages/Members/Members"));
const DMCA = lazy(() => import("./pages/DMCA/DMCA"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse/TermsOfUse"));
const Editorialguidelines = lazy(() => import("./pages/Editorialguidelines/Editorialguidelines"));
const Verification = lazy(() => import("./pages/Verification/Verification"));
const Forums = lazy(() => import("./pages/Forums/Forums"));
const Ranker = lazy(() => import("./pages/Ranker/Ranker"));
const MyAnimelist = lazy(() => import("./pages/MyAnimelist/MyAnimelist"));
const BlogForm = lazy(() => import("./pages/BlogForm/BlogForm")); 
const SubcategoryBlogs = lazy(() => import("./pages/SubcategoryBlogs/SubcategoryBlogs")); 
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard")); 
const Blog = lazy(()=> import("./pages/Blog/Blog"));
const Tags = lazy(()=> import("./pages/Tags/Tags"));
const Category = lazy(()=>import("./pages/Category/Category"))
const Subcategory = lazy(()=>import("./pages/Subcategory/Subcategory"))
const Users = lazy(()=>import("./pages/Users/Users"))
const DashboardContributors = lazy(()=>import("./pages/DashboardContributors/DashboardContributors"))
const Admin = lazy(()=>import("./pages/Admin/Admin"))
const Profile = lazy(()=>import("./pages/Profile/Profile"))
const Links = lazy(()=>import("./pages/Links/Links"))
const Error = lazy(()=>import("./pages/Error/Error"))
const DashboardContact = lazy(()=>import("./pages/DashboardContact/DashboardContact"))


const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contributor" element={<Contributor />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/vedio-update" element={<AdminVedio />} />
        <Route path="/:slug" element={<SubBlogs />} />
        <Route path="/About" element={<About />} />
        <Route path="/Members" element={<Members />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/DMCA" element={<DMCA/>} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
        <Route path="/TermsOfUse" element={<TermsOfUse/>} />
        <Route path="/Editorialguidelines" element={<Editorialguidelines/>} />
        <Route path="/verification-fact-checking-policy" element={<Verification/>} />
        <Route path="/forums" element={<Forums/>} />
        <Route path="/Ranker" element={<Ranker/>} />
        <Route path="/Animelist" element={<MyAnimelist/>}/>
        <Route path="/blogform" element={<BlogForm />} />
        <Route path="/:category/:subcategory" element={<SubcategoryBlogs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Tags" element={<Tags />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Subcategory" element={<Subcategory />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/contributors" element={<DashboardContributors/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/links" element={<Links/>} />
        <Route path="/contact-details" element={<DashboardContact/>} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;