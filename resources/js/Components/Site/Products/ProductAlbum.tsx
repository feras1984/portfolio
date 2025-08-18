import React from 'react';
import File from "@/models/files/File";
import styles from "./styles.module.scss";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar} from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {CardMedia} from "@mui/material";


const ProductAlbum: React.FC<{album: File [], productName: string}> = ({album, productName}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            className={styles.swiper}
            // navigation={true}
            pagination={true}
            slidesPerView={1}
        >
            {
                album.map((image) => (
                    <SwiperSlide key={image.id}>
                        <CardMedia
                            classes={{
                                img: styles.mediaImg
                            }}
                            component="img"
                            height="194"
                            image={`/file/products/${image.url}`}
                            alt={productName}
                        ></CardMedia>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default ProductAlbum;
