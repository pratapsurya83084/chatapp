import Left from "./home/leftpart/Left";
import Right from "./home/rightpart/Right";
import Signup from "./component/Signup";
import Login from "./component/Login";
import { useAuth } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./component/Loading";

function App() {
  const [authUser] = useAuth();
  // console.log("get jwt : ", authUser);

  return (
    // <Loading/>
    <Routes>
      {/* protected routes */}
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex flex-row h-screen">
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* authUser? <Navigate to="/"/>: */}
      <Route
        path="/login"
        element={ <Login />}
      />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
