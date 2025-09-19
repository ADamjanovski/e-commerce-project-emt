# Development Guide

Basic development information for the E-Commerce Project.

## Project Structure

```
├── backend/          # Spring Boot API
│   ├── src/main/java/com/backend/
│   │   ├── configuration/     # Security config
│   │   ├── dto/              # Data objects
│   │   ├── model/            # Database entities
│   │   ├── repository/       # Database access
│   │   ├── service/          # Business logic
│   │   └── web/              # REST controllers
│   └── docker-compose.yml    # Database setup
├── frontend/         # React app
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/            # Page components
│   │   ├── context/          # State management
│   │   └── api/              # API calls
└── README.md
```

## Database Schema

Main entities:
- **User** - User accounts
- **Product** - Products for sale
- **Category** - Product categories
- **ShoppingCart** - User carts
- **ShoppingCartItem** - Items in carts

## API Endpoints

- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/categories` - List categories
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Authentication

Uses JWT tokens:
1. Login to get token
2. Include token in requests: `Authorization: Bearer <token>`

## Development Tips

### Backend
- Use `./mvnw spring-boot:run` to start
- Check logs for errors
- Use Swagger UI at `http://localhost:8080/swagger-ui.html`

### Frontend
- Use `npm run dev` to start
- Check browser console for errors
- Use React DevTools extension

### Database
- Use `docker-compose up -d` to start PostgreSQL
- Default port: 2345
- Default database: emt_shop

## Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Database connection**: Check credentials in .env
3. **CORS errors**: Backend should allow frontend origin
4. **JWT errors**: Check token format and expiration
