import TopNavBar from "../../component/TopNavBar";
import HomePageCarousel from "../../component/HomePageCarousel";
import {useEffect, useState} from "react";
import Disclaimer from "../../component/Disclaimer";

export function HomePage() {
    const [showToast, setShowToast] = useState<boolean>(false);
    const toggleShowToast = () => setShowToast(!showToast)

    useEffect(()=>{
        setShowToast(true);
    },[])

    return(<div>
        <TopNavBar/>
        {/*<Container>*/}
            <HomePageCarousel/>
        {/*</Container>*/}
        {/*<Disclaimer show={showToast} toggleShow={toggleShowToast}/>*/}
    </div>)
}