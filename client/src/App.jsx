import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/authContext';
import { NotificationProvider } from './contexts/NotificationContext'
import Path from './paths';
import styles from './App.module.css'

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Logout from './components/auth/logout/Logout';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import Notification from './components/notification/Notification'
import CrystalCreate from './components/crystals/create/CrystalCreate';
import CrystalEdit from './components/crystals/crystal-edit/CrystalEdit';
import EnhancedHome from './components/home/Home';
import Loading from './components/loading/Loading';
import CrystalCatalog from './components/crystals/catalog/CrystalCatalog';
import UserProfile from './components/userProfile/UserProfile';
import AboutUs from './components/aboutus/AboutUs';
import ContactUs from './components/contact/ContactUs';
import Search from './components/search/Search';
import PageNotFound from './components/pageNotFound/PageNotFound';
// import CrystalDetails from './components/crystals/crystal-details/CrystalDetails';
const CrystalDetails = lazy(() => import('./components/crystals/crystal-details/CrystalDetails'));

function App() {
  return (
    <NotificationProvider>
    <AuthProvider>
      <div className={`min-vh-100 ${styles.homeScreen}`}>
        <Header />
        {/* <Suspense fallback={<h1 style={{color: 'black'}}>Loading...</h1>}> */}
        <Suspense fallback={<Loading />}>
        <Notification />
        <Routes>
          <Route path={Path.Home} element={<EnhancedHome />}/>
          <Route path={Path.Crystals} element={<CrystalCatalog />}/>
          <Route path={Path.CrystalDetails} element={<CrystalDetails />} />
          <Route path={Path.About} element={<AboutUs />} />
          <Route path={Path.Contact} element={<ContactUs />} />
          <Route path={Path.Search} element={<Search />} />

          <Route element={<GuestGuard />}>
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.Register} element={<Register />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path={Path.Logout} element={<Logout />} />
            <Route path={Path.CrystalsCreate} element={<CrystalCreate />} />
            <Route path={Path.CrystalEdit} element={<CrystalEdit />} />
            <Route path={Path.MyProfile} element={<UserProfile />} />
          </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Suspense>
        <Footer />
      </div>
    </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
