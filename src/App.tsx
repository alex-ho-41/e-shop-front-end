import React, {createContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import ProductListingPage from "./ui/page/ProductListingPage";
import ProductDetailPage from "./ui/page/ProductDetailPage";
import ErrorPage from "./ui/page/ErrorPage";
import LoginPage from "./ui/page/LoginPage";
import SearchPage from "./ui/page/SearchPage";
import {UserData} from "./data/UserData";
import FirebaseAuthService from "./authService/FirebaseAuthService";
import LoadingSpinner from "./ui/component/LoadingSpinner";
import {HomePage} from "./ui/page/HomePage";
import ShoppingCartPage from "./ui/page/ShoppingCartPage";
import CheckOutPage from "./ui/page/CheckOutPage";

export const userContext = createContext<UserData|null|undefined>(undefined)


function App() {
    // null= no one login
    // undefined = not yet check any one is login-ed
    const [user, setUser] = useState<UserData|null|undefined>(undefined)
    useEffect(()=>{
        FirebaseAuthService.handleOnAuthStateChanged(setUser)
    },[])

    const renderApp = ()=>{
       return user !== undefined ? <userContext.Provider value={user}>
           <div className="App">
               <HashRouter>
                   <Routes>
                       <Route path="/" element={<HomePage/>}/>
                       <Route path="/product/allProduct" element={<ProductListingPage/>}/>
                       <Route path="/product/:productId" element={<ProductDetailPage/>}/>
                       <Route path="/shoppingcart" element={user? <ShoppingCartPage/>:<Navigate to={"/login"}/>}/>
                       <Route path="/login" element={<LoginPage/>}/>
                       <Route path="/search" element={<SearchPage/>}/>
                       <Route path="/checkout/:transactionId" element={<CheckOutPage/>}/>
                       {/*<Route path="/thankyou" element={<ThankYou/>}/>*/}
                       <Route path="/error" element={<ErrorPage/>}/>
                       <Route path="*" element={<Navigate to={"/"}/>}/>
                   </Routes>
               </HashRouter>
           </div>
       </userContext.Provider> :
           <LoadingSpinner/>
    }


  return(
      renderApp()
  );
}

export default App;
