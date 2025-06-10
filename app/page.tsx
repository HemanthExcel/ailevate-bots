"use client";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import Dashboard from "./dashboard/page";

export default function Homecontent() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
       <Analytics />
    </main>
  );
}
function Home() {
  const searchParams = useSearchParams();

  const [viewChart, setViewChart] = useState(false);
  //Always call useEffect at the top level
  useEffect(() => {
    // if (typeof window !== 'undefined') {
    // Only run this logic in the browser
    checkUserLogin();
    //}
  }); // Empty dependency array to run the effect only once on mount
  function pageload() {
    Cookies.remove("CloudFront-Policy");
    Cookies.remove("CloudFront-Key-Pair-Id");
    Cookies.remove("CloudFront-Signature");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("id_token");

    window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}login?client_id=${process.env.NEXT_PUBLIC_AWS_USERPOOL_WEB_CLIENT_ID}&response_type=code&scope=email+openid+profile+aws.cognito.signin.user.admin&redirect_uri=${process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_URL}`;
  }
  //Function to check user login status and handle OAuth flow
  function checkUserLogin() {

    const accToken = Cookies.get("access_token");
    const idToken = Cookies.get("id_token");
    //setViewChart(true);
    if (!accToken || !idToken) {
      const code: string | null = (searchParams.get('code') || null);
      console.log("code", code);
      if (code) {
        console.log(code, "code")
        axios({
          method: "POST",
          url: process.env.NEXT_PUBLIC_AUTH_URL + "oauth2/token",
          params: {
            grant_type: "authorization_code",
            client_id: process.env.NEXT_PUBLIC_AWS_USERPOOL_WEB_CLIENT_ID,
            redirect_uri: process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_URL,
            code: code,
          },
          data: {},
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }).then((resp) => {
          try {
            console.log("resp", resp);
            Cookies.set("access_token", resp.data["access_token"]);
            Cookies.set("id_token", resp.data["id_token"]);
            setViewChart(true);
            //const decoded = jwtDecode(resp.data.id_token);
            //  fetchuser(resp, decoded);
          } catch (error) {
            console.error("Error decoding JWT:", error);
            //pageload();
          }
        }).catch((error) => {
          console.error("Error Config:", error);
          // pageload();
        });
      } else {
        setViewChart(false);
        pageload();
      }
    } else {
      setViewChart(true);
    }
  }

  return (
    <main>
      {viewChart && <Dashboard />}

    </main>
  );
}
