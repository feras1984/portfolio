import React, {useRef} from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import {useTranslation} from "react-i18next";
import GalleryCard from "@/Components/Site/Gallery/GalleryCard";
import {Box, Grid} from "@mui/material";
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";
import {Link, usePage} from "@inertiajs/react";

const Galleries: React.FC<{blocks: BlockProps []}> = ({blocks}) => {
    const { t } = useTranslation();
    const lang = usePage().props.lang;

    const containerRef = useRef(null);
    const itemRef = useRef([] as (HTMLDivElement | null) []);
    itemRef.current = [];

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !itemRef.current.includes(el)) {
            itemRef.current.push(el);
        }
    }

    useGSAP(() => {
        // gsap.timeline()
        //     .from(containerRef.current, {
        //         opacity: 0,
        //         duration: 1,
        //         ease: Power3.easeOut,
        //         scrollTrigger: {
        //             trigger: containerRef.current,
        //             toggleActions: "restart none none none",
        //             scrub: true,
        //         }
        //     })
        //     .from(itemRef.current, {
        //     opacity: 0,
        //     duration: 1,
        //     // scale: 0.5,
        //     y: 20,
        //     // x: -100,
        //     ease: Power3.easeOut,
        //     stagger: 0.5,
        //         scrollTrigger: {
        //             trigger: containerRef.current,
        //             toggleActions: "restart none none none",
        //             scrub: true,
        //         }
        // }, '+=0.5')
    }, {scope: containerRef});

    return (
        <Box className="m-[16px]">
            <Link href={`/${lang}/block/gallery`}>
                <SectionTitle title={t('gallery')}></SectionTitle>
            </Link>
            <Grid
                container
                spacing={2}
                direction={{xs: 'column', md: 'row'}}
                justifyContent={{xs: 'center', md: 'center'}}
                alignItems={{sx: 'center', md: 'center'}}
                ref={containerRef}
            >
            {
                blocks.map((block, key) => (
                    <Grid
                        item
                        columns={{xs: 12, md: 6}}
                        key={key}
                        ref={(el) => addToRefs(el)}
                        sx={{margin: 'auto'}}
                    >
                        <Link href={`/${lang}/block/details/gallery/${block.id}`}>
                            <GalleryCard block={block}></GalleryCard>
                        </Link>
                    </Grid>
                ))
            }
            </Grid>
        </Box>
    );
};

export default Galleries;
