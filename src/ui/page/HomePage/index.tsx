import TopNavBar from "../../component/TopNavBar";
import HomePageCarousel from "../../component/HomePageCarousel";
import {Container} from "react-bootstrap";

export function HomePage() {


    return(<div>
        <TopNavBar/>
        {/*<Container>*/}
            <HomePageCarousel/>
        {/*</Container>*/}

    </div>)
}