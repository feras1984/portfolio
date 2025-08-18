import {Head} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import MenuLink from "@/models/Link/MenuLink";
import Language from "@/models/language/Language";
import React, {useRef} from "react";
import {Box} from "@mui/material";
import BlockProps from "@/Interfaces/Site/BlockProps";
import MainSlider from "@/Components/Site/MainSlider/MainSlider";
import Services from "@/Components/Site/Services/Services";
import SiteDivider from "@/Components/Site/Divider/SiteDivider";
import styles from "./styles.module.scss";
import Clients from "@/Components/Site/Clients/Clients";
import Galleries from "@/Components/Site/Gallery/Galleries";
import ClientDivider from "@/Components/Site/Divider/ClientDivider";
import Mission from "@/Components/Site/Mission/Mission";
import About from "@/Components/Site/About/About";
import Contact from "@/Components/Site/Contact/Contact";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {setSpinner} from "@/Redux/Reducers/SpinnerSlice/SpinnerSlice";
import LineDivider from "@/Components/Site/Divider/LineDivider";
import LineDividerReverse from "@/Components/Site/Divider/LineDividerReverse";
import LinkListProps from "@/Interfaces/Site/LinkListProps";
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";
import Articles from "@/Components/Site/Articles/Articles";
import Industries from "@/Components/Site/Industries/Industries";
import News from "@/Components/Site/News/News";

interface HomeProps extends LinkListProps{
    // mainSliders: BlockProps [],
    // services: BlockProps [],
    // clients: BlockProps [],
    // galleries: BlockProps [],
    // missions: BlockProps [],
    // about: BlockProps [],
    // news: BlockProps [],
    // articles: BlockProps [],
    // industries: BlockProps [],
}
const Home:React.FC<HomeProps> = ({
                                        mainLinks,
                                        socialLinks,
                                        footerLinks,
                                        contactLinks,
                                        logo,
                                        languages,
                                        // mainSliders,
                                        // services,
                                        // clients,
                                        // galleries,
                                        // missions,
                                        // about,
                                        // news,
                                        // articles,
                                        // industries,
                                  }) => {
    const dispatch = useAppDispatch();
    const mainSliderRef = React.useRef<HTMLDivElement>(null);
    const aboutRef = React.useRef<HTMLDivElement>(null);

    // React.useEffect(() => {
    //     // if (mainLinks.length > 0) {
    //     //     dispatch(setSpinner(false));
    //     // }
    //     setTimeout(() => {
    //         dispatch(setSpinner(false));
    //     }, 3000)
    // }, [mainLinks])

    // useGSAP(() => {
    //     // animate(0);
    //     // gsap.timeline()
    //     //     .from(mainSliderRef.current, {
    //     //         duration: 3,
    //     //         ease: Power3.easeOut,
    //     //         y: '0',
    //     //         scrollTrigger: {
    //     //             trigger: mainSliderRef.current,
    //     //             toggleActions: "play pause resume reverse",
    //     //             start: 'top 80%',
    //     //             scrub: true,
    //     //         },
    //     //     })
    //     //     .to(mainSliderRef.current, {
    //     //     // duration: 3,
    //     //     // ease: Power3.easeOut,
    //     //     y: '-10%',
    //     //
    //     // })
    // }, {scope: mainSliderRef});
    // ========================================================//

    return(
        <Box>
            <HeaderLayout
                mainLinks={mainLinks}
                socialLinks={socialLinks}
                contactLinks={contactLinks}
                footerLinks={footerLinks}
                logo={logo}
                languages={languages}
             >
                <Head title={'Home'}></Head>
                <div>HOME is HERE</div>

            </HeaderLayout>
        </Box>


    );
}
export default Home;
