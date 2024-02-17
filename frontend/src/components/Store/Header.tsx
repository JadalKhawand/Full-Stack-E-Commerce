import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCommerceStore } from "../../store";
import { parseJwt } from "../../shared/utils";

function Header() {
  const { token, setShowCart } = useCommerceStore();

  const [decodedToken, setDecodedToken] = useState<any>({});
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    console.log(token);
    if (token) {
      setDecodedToken(parseJwt(token));
    }
  }, [token]);
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-row justify-between px-6 items-center">
        <div className="flex ">
          <img width={50} src="/iconimage.png" alt="Ecommerce store logo" />
          <p className="flex items-center gap-2">
            Hello
            <Link to={"/auth/login"} className="text-blue-600">
              Sign in
            </Link>
            or
            <Link to={"/auth/register"} className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/home">Home</Link>
          <Link to="/sell">Sell</Link>
          {decodedToken?.user?.store && (
            <Link to="/my-products">My Products</Link>
          )}
          <Link to="/my-orders">My Orders</Link>
          <CiShoppingCart
            onClick={() => setShowCart(true)}
            size={25}
            className="m-0 p-0 cursor-pointer"
          />
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="cursor-pointer rounded-full bg-[var(--accent-color)] p-2"
          >
            <img width={20} src="/profile.png" alt="User Menu" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
