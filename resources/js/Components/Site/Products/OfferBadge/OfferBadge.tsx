import React from 'react';
import styles from "./styles.module.scss";
import Offer from "@/models/offer/Offer";
import {
    Box,
} from "@mui/material";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";

const OfferBadge: React.FC<{offer: Offer}> = ({offer}) => {
    const commonService = ServiceContainer.get(CommonService);
    const calculateOffer = () => {
        if (offer.isPercent) return offer.amount + '%';
        else return commonService.currencyFormat(offer.amount);
    }

    const offerName = () => {
        if (offer.type === 'category') return offer.name;
        else return '';
    }

    return (
        <div className={styles.badgeOverlay}>
            {/*<span className="top-left badge orange">Sale 50% Off</span>*/}
            <span className={`${styles.topRight} ${styles.badge} ${styles.red}`}>
                {offerName()} {calculateOffer()} Off
            </span>
        </div>
    );
};

export default OfferBadge;
