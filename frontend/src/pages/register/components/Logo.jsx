import React from "react";
import logo from "@/assets/img/logo.png";
import "@/pages/register/index.less";

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <img src={logo} alt="SportsBuddy Logo" className="logo-img" />
    </div>
  );
}
