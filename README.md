# InventoryManagerFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## accomplised

### Authentication 
- [x] handle user authentication [ basic auth with user and password ]
- [x] manage session authentication [ store access and refresh token ]
- [x] intercept all http requests to api and inject `access-token` to the `Authorization` header
- [x] handle user logging out by clearing cache and redirect to login page
- [ ] add auth guard to all endpoints - now httpinterceptor will handle it but need guard which is not 100% correct

### Products
- [x] List all products view 
- [x] view a product details on click
- [x] create new product
- [ ] delete product functionality - button exist with no action
- [ ] apply pagination on listing
