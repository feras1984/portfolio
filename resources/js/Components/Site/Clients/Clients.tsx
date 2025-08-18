import React, {useRef} from "react";
import styles from "./styles.module.scss"
import {
    Box, Container,
    Typography,
    Grid,
} from "@mui/material";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import {useTranslation} from "react-i18next";
import {usePage} from "@inertiajs/react";
import {Swiper, SwiperProps, SwiperRef, SwiperSlide} from 'swiper/react';
import {A11y, Autoplay, Navigation, Pagination, Scrollbar} from 'swiper/modules';
import {SwiperClass} from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ServiceCard from "@/Components/Site/Services/ServiceCard";
import BlockProps from "@/Interfaces/Site/BlockProps";
import ClientCard from "@/Components/Site/Clients/ClientCard";
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";

const Clients: React.FC<{blocks: BlockProps []}> = ({blocks}) => {
    const { t } = useTranslation();
    // const progressCircle = useRef<any>(null);
    // const progressContent = useRef<any>(null);
    // const lang = usePage().props.lang;
    // const onAutoplayTimeLeft = (s: SwiperClass, time: number, progress: number) => {
    //     if (progressCircle.current) {
    //
    //         progressCircle.current.style.setProperty('--progress', String(1 - progress));
    //     }
    //
    //     if (progressContent.current) {
    //         progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    //     }
    // };

    const containerRef = useRef(null);
    const itemRef = useRef([] as (HTMLDivElement | null) []);
    itemRef.current = [];

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !itemRef.current.includes(el)) {
            itemRef.current.push(el);
        }
    }

    useGSAP(() => {
        gsap.timeline()
            .from(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: Power3.easeOut,
                scrollTrigger: {
                    trigger: containerRef.current,
                    toggleActions: "restart none none none",
                    scrub: true,
                }
            })
            .from(itemRef.current, {
                opacity: 0,
                duration: 0.8,
                // scale: 0.5,
                y: 20,
                // x: -100,
                ease: Power3.easeOut,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    toggleActions: "restart none none none",
                    scrub: true,
                }
            }, '+=0.5')
    }, {scope: containerRef});

    return (
        <Box className="m-[16px]  min-h-[350px]">
            <SectionTitle title={t('our-clients')}></SectionTitle>
            {/*<Box className="relative">*/}
            {/*    <Swiper*/}
            {/*        modules={[Navigation, Pagination, Autoplay]}*/}
            {/*        className="mySwiper"*/}
            {/*        navigation={true}*/}
            {/*        pagination={{*/}
            {/*            dynamicBullets: true,*/}
            {/*        }}*/}
            {/*        autoplay={{*/}
            {/*            delay: 2500,*/}
            {/*            disableOnInteraction: false,*/}
            {/*        }}*/}
            {/*        loop={true}*/}
            {/*        onAutoplayTimeLeft={onAutoplayTimeLeft}*/}
            {/*        spaceBetween={30}*/}
            {/*        centeredSlides={true}*/}
            {/*        breakpoints={{*/}
            {/*            350: {*/}
            {/*                slidesPerView: 1,*/}
            {/*            },*/}

            {/*            700: {*/}
            {/*                slidesPerView: 2,*/}
            {/*            },*/}

            {/*            992: {*/}
            {/*                slidesPerView: Math.min(3, Math.floor(blocks.length / 2)),*/}
            {/*            },*/}
            {/*        }}*/}
            {/*        // onSlideChange={() => console.log('slide change')}*/}
            {/*        // onSwiper={(swiper) => console.log(swiper)}*/}
            {/*    >*/}
            {/*        {blocks.map((slider, key) => (*/}
            {/*            <Container*/}
            {/*                maxWidth="xl"*/}
            {/*                component="div"*/}
            {/*                sx={{position: 'relative'}}*/}
            {/*                key={key + '-' + slider.title}*/}
            {/*            >*/}
            {/*                <SwiperSlide className={styles.swiperSlide} key={key + '-' + slider.title}>*/}
            {/*                    <ClientCard block={slider}></ClientCard>*/}
            {/*                </SwiperSlide>*/}
            {/*            </Container>*/}
            {/*        ))}*/}

            {/*        /!*============================================================*!/*/}
            {/*        /!*This section for circular progress spinner*!/*/}
            {/*        /!*============================================================*!/*/}
            {/*        /!*<div className={styles.autoplayProgress} slot="container-end">*!/*/}
            {/*        /!*    <svg viewBox="0 0 48 48" ref={progressCircle}>*!/*/}
            {/*        /!*        <circle cx="24" cy="24" r="20"></circle>*!/*/}
            {/*        /!*    </svg>*!/*/}
            {/*        /!*    <span ref={progressContent}></span>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*        /!*    =============================================================*!/*/}
            {/*    </Swiper>*/}
            {/*</Box>*/}
            <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                ref={containerRef}
            >
                {blocks.map((slider, key) => (
                    <Grid
                        // maxWidth="xl"
                        // component="div"
                        // sx={{position: 'relative'}}
                        item
                        columns={{xs: 6, sm: 3, md: 3}}
                        key={key + '-' + slider.title}
                        ref={(el) => addToRefs(el)}
                    >
                        <ClientCard block={slider}></ClientCard>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
};

export default Clients;
