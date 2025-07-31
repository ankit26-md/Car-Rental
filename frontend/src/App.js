import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminPanel/AdminDashboard";
import AdminLogin from "./AdminPanel/AdminLogin";
import Categories from "./Pages/Categories";
import Locations from "./Pages/Locations";
import Review from "./Pages/Review";
import Home from "./Passenger/Home";
import About from "./Passenger/About";
import Contact from "./Passenger/Contact";
import BookCar from "./Passenger/BookCar";
import UserLogin from "./Passenger/UserLogin";
import Signup from "./Passenger/Signup";
import Passenger from "./Pages/Passenger";
import VehicleOwners from "./Pages/VehicleOwners";
import Postcar from "./VehicleOwner/Postcar";
import ViewBooking from "./VehicleOwner/ViewBooking";
import ViewReview from "./VehicleOwner/ViewReview";
import Safetyroutes from "./VehicleOwner/Safetyroutes";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Main from "./VehicleOwner/Main";
import SafeRoute from "./PassengerPanel/SafeRoute";
import Profile from "./PassengerPanel/ShowCar";
import Hist from "./PassengerPanel/Hist";
import BookingPassenger from "./PassengerPanel/BookingPassenger";
import Vlogin from "./VehicleOwner/Vlogin";
import Nav from "./Passenger/Nav";
import ShowCar from "./PassengerPanel/ShowCar";

function App() {
  return (

 <Routes>
  {/* Public Routes */}
  <Route path="/home" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/bookcar" element={<BookCar />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/users" element={<UserLogin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/admin-login" element={<AdminLogin />} />

  {/* Admin Protected Routes */}
  <Route element={<ProtectedRoutes />}>
    <Route path="/dashboard" element={<AdminDashboard />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/location" element={<Locations />} />
    <Route path="/review" element={<Review />} />
    <Route path="/passenger" element={<Passenger />} />
    <Route path="/owner" element={<VehicleOwners />} />
  </Route>

  {/* Vehicle Owner Protected Routes */}
  <Route element={<Safetyroutes />}>
    <Route path="/main" element={<Main />} />
    <Route path="/postcar" element={<Postcar />} />
    <Route path="/booking" element={<ViewBooking />} />
    <Route path="/vreview" element={<ViewReview />} />
    <Route path="/vlogin" element={<Vlogin />} />

  </Route>

  {/* Passenger Protected Routes */}
  <Route element={<SafeRoute />}>
    <Route path="/carbooking" element={<ShowCar />} />
    <Route path="/history" element={<Hist />} />
    <Route path="/bookings" element={<BookingPassenger />} />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<Home />} />
</Routes>

  );
}

export default App;
