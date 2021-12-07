import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/signin';
import Layout from './components/layout';
import Main from './components/main';
import Product from './components/product';
import { AuthProvider } from './contexts/authcontext';
import SignUp from './components/signup';
import RequireAuth from './components/requireauth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn/>}></Route>
            <Route path="signup" element={<SignUp/>}></Route>
            <Route path="home" element={<RequireAuth><Layout/></RequireAuth>}>
              <Route index element={<Main/>}></Route>
              <Route path=":productId" element={<Product/>}></Route>
            </Route>
          </Routes>
        </Router>  
      </AuthProvider>  
    </div>
  );
}


export default App;
