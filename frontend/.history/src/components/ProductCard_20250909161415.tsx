import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { DisplayProductDto } from "../api";

interface ProductCardProps {
  product: DisplayProductDto;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        sx={{
          // 16:9 aspect ratio
          pt: "56.25%",
        }}
        image={product.image_url || "https://via.placeholder.com/150"}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category?.name}
        </Typography>
        <Typography variant="h6" component="p" sx={{ mt: 1 }}>
          ${product.price?.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;