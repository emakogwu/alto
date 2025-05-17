import './Dashboard.module.scss'
import {Header} from "./header/Header.tsx";
import dashboardStyles from "./Dashboard.module.scss";
import {Overview} from "./overview/Overview.tsx";


function Dashboard() {


  return (
    <>
        <div className={dashboardStyles.container}>
            <Header/>
            <Overview/>
        </div>

    </>
  )
}

export default Dashboard
