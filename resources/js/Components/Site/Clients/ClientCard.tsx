import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {usePage} from "@inertiajs/react";
import {styled} from "@mui/material/styles";
import {Box, BoxProps} from "@mui/material";
import styles from "@/Components/Site/Services/styles.module.scss";

const ClientCard: React.FC<{block: BlockProps}> = ({block}) => {
    const lang = usePage().props.lang;

    const CardStyle = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        height: '150px',
        width: '150px',
        borderRadius: '100%',
        marginBottom: '32px',
        '&:before' : {
            borderRadius: '100%',
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(/file/blocks/${block.images[0].url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(0.9)',
            transition: 'filter 0.3s ease-in-out',
        },
        //
        // '&:after' : {
        //     borderRadius: '100%',
        //     position: 'absolute',
        //     content: '""',
        //     bottom: 0,
        //     left: 0,
        //     width: '100%',
        //     height: '100%',
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //     // backgroundImage: `url(/file/blocks/${block.images[0].url})`,
        //     // backgroundImage: 'transparent',
        //     backgroundPosition: 'center',
        //     backgroundSize: 'cover',
        //     backgroundRepeat: 'no-repeat',
        //     filter: 'grayscale(0.9)',
        //     zIndex: 10,
        //     transition: 'height 0.3s ease-in-out',
        // },
        //
        // '&:hover' : {
        //     '&:after' : {
        //         height: '0%',
        //         transition: 'height 0.3s ease-in-out',
        //     },
        //
        //     '&:before' : {
        //         filter: 'grayscale(0.1)',
        //         transition: 'filter 0.3s ease-in-out',
        //     },
        // }
    })

    return (
        <Box>
            <CardStyle>
                <Box className={`absolute w-full h-[100px] bottom-0 ${styles.cardContainer}`}>
                    <p
                        className= {`${styles.textTitle} text-title text-xl font-bold uppercase`}
                    >
                        {block.title}
                    </p>
                </Box>
            </CardStyle>
        </Box>
    );
};

export default ClientCard;
