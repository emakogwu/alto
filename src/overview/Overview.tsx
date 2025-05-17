import OverviewStyles from "./Overview.module.scss";
import {Fragment} from "react";
import {AltoMap} from "../map/AltoMap.tsx";

export  function Overview (){
    return <Fragment>
        <div className={OverviewStyles.OverviewContainer}>
            <AltoMap/>
        </div>
    </Fragment>
}