import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Container,
    Box, BoxProps,
} from "@mui/material";
import File from "@/models/files/File";
import {styled} from "@mui/material/styles";
import styles from "./styles.module.scss";

const GalleryCard: React.FC<{block: BlockProps}> = ({block}) => {
    const image = block.images.find(img => img.isCover) || new File({});
    const ImageStyle = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        width: '300px',
        height: '421px',
        borderRadius: '53px',
        minHeight: '190px',
        '&:before' : {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '53px',
            backgroundImage: `url(/file/blocks/${block.images[0].url})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(0.9)',
            transition: 'filter 0.3s ease-in-out',
        }
    })
    return (
        // <Box className="flex justify-center">
        //     <Card sx={{ width: 328 }}>
        //         <CardMedia
        //             sx={{ height: 140 }}
        //             image={`/file/blocks/${image.url}`}
        //             title={block.title}
        //         />
        //         <CardContent>
        //             <Typography gutterBottom variant="h5" component="div" noWrap={true}>
        //                 {block.title}
        //             </Typography>
        //             <Typography variant="body2" color="text.secondary" noWrap={true}>
        //                 {block.description}
        //             </Typography>
        //         </CardContent>
        //     </Card>
        // </Box>
        <Box className="relative m-0 p-0 w-[300px]">
            <ImageStyle />
            <Box className={`absolute bottom-0 left-0 right-0 flex items-center ${styles.titleAria}`}>
                <Typography variant="h4" align="center" sx={{fontWeight: 'bold', flexBasis: '100%'}}>{block.title}</Typography>
            </Box>
        </Box>
    );
};

export default GalleryCard;
