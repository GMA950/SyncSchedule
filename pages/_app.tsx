import "../public/style.css";
import "../public/nprogress.css";

import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import { Auth } from "../src/client/components/Auth/Context";
import Navigation from "../src/client/components/Navigation";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      
      <Auth>
        {/*<div className="banner">
          <img style = {{position:"absolute", width:"100%", top:"-40px", display:"inline-block"}}src="/banner.png"/>
    </div>*/}
        <Navigation />
        <Component {...pageProps} />
      </Auth>
    );
  }
}
