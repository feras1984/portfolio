import React from 'react';
import {red, grey} from "@mui/material/colors";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    IconButton,
} from "@mui/material";
import UserShort from "@/models/User/UserShort";
import Review from "@/models/product/Review";


const ProductReview: React.FC<{productId: number, review: Review}> = ({productId, review}) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: grey[500] }}
                        aria-label="recipe"
                        alt={review.name}
                        src={`/file/users/${review.avatar}`}
                    >
                    </Avatar>
                }
                title={review.name}
                subheader={review.createdAt}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {review.review}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductReview;
