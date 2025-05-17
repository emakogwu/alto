import {Fragment} from "react";
import headerStyles from "./Header.module.scss";
import logo from "../assets/logo.png";

export function Header() {
   return <Fragment>
       <div className={headerStyles.headerContainer}>
           <div className={headerStyles.logoAndUserSection}>
               <div className={headerStyles.logo}>
                   <div className="menu">
                       <i className="pi pi-bars text-3xl font-light"></i>
                   </div>
                   <img src={logo} alt="Alto logo" width={120}/>
               </div>
               <div className={headerStyles.user}>
                   <span className={headerStyles.profile}>EA</span>
                   <span>
                   <i className="pi pi-bell text-3xl"></i>
               </span>
                   |
                   <span>
                   <i className="pi pi-shopping-cart text-3xl"></i>
               </span>

                   <span>
                   <i className="pi pi-question-circle text-3xl"></i>
               </span>
               </div>
           </div>
           <div className={headerStyles.welcomeSection}>
               <h1>Hi Emmanuel, Welcome to <span className={headerStyles.alto}>Alto</span></h1>
           </div>
       </div>

   </Fragment>
}

