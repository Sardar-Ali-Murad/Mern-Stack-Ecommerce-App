import React from "react";

// import UserDashboard from "./UserDashboard";
// import UpdateUser from "./UpdateUser";
// import Products from "./Products.js";
// import Reviews from "./Reviews";
// import Cart from "./Cart";
// import ProductDetail from "./ProductDetail";
// import UpdateReview from "./UpdateReview";
// import Products from "./Products";

const UserDashboard=React.lazy(()=>import("./UserDashboard"))
const UpdateUser=React.lazy(()=>import("./UpdateUser"))
const Products=React.lazy(()=>import("./Products"))
const Reviews=React.lazy(()=>import("./Reviews"))
const Cart=React.lazy(()=>import("./Cart"))
const ProductDetail=React.lazy(()=>import("./ProductDetail"))
const UpdateReview=React.lazy(()=>import("./UpdateReview"))

export {
    UserDashboard,
    UpdateUser, Reviews, Cart,
    Products,
    ProductDetail,
    UpdateReview
}