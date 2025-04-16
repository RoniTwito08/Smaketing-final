import React, { useEffect, useState } from "react";
import { extendTheme } from "@mui/material/styles";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalysisIcon from "@mui/icons-material/Analytics";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { ChatList } from "../Chat/ChatList";
import { ChatModal } from "../Chat/ChatModal";
import logo from "../../assets/Smarketing.png";
import { MyPosts } from "../../pages/userProfileScreen/MyPosts";
import { AccountSettings } from "../../pages/userProfileScreen/AccountSettings";
import { BusinessSetting } from "../../pages/userProfileScreen/BusinessSetting";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import MainFeed from "../../pages/feedPage/MainFeed";
import { User } from "../../types/user";
import { GoogleAdsAnalytics } from "../GoogleAdsAnalytics/GoogleAdsAnalytics";
import PlansPage from "../../pages/Plans/PlansPage";
import Plansicon from "@mui/icons-material/Paid";

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;
  const { user, accessToken } = useAuth();
  const router = useDemoRouter("/feed");
  const demoWindow = window ? window() : undefined;
  const { logout } = useAuth();
  const [selectedChatUser, setSelectedChatUser] = useState<User | null>(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    if (router.pathname === "/logout") {
      logout();
    }
  }, [router.pathname, logout]);

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Menu",
    },
    {
      segment: "feed",
      title: "הקמפיינים שלי",
      icon: <ContactsOutlinedIcon />,
    },
    {
      segment: "analytics",
      title: "ניתוחים ונתונים",
      icon: <AnalysisIcon />,
    },
    {
      segment: "plans",
      title: "מסלול השיווק שלי",
      icon: <Plansicon />,
    },
    {
      segment: "chats",
      title: "צאטים",
      icon: <CalendarTodayOutlinedIcon />,
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Settings",
    },
    {
      segment: "settings",
      title: "הגדרות",
      icon: <MenuOutlinedIcon />,
      children: [
        {
          segment: "account",
          title: "הגדרות משתמש",
          icon: <SettingsIcon />,
        },
        {
          segment: "business-settings",
          title: "הגדרות עסק",
          icon: <SettingsIcon />,
        },
      ],
    },
    {
      kind: "divider",
    },
    {
      segment: "logout",
      title: "התנתקות",
      icon: <LogoutIcon />,
    },
  ];

  const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: "class",
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string | URL) => setPathname(String(path)),
      };
    }, [pathname]);

    return router;
  }

  // Update the chat handling
  const handleSelectUser = (user: User) => {
    // If selecting same user, just show chat
    if (selectedChatUser?._id === user._id) {
      setIsChatVisible(true);
      return;
    }

    // If selecting new user, update state and show chat
    setSelectedChatUser(user);
    setIsChatVisible(true);
  };

  const handleCloseChat = () => {
    setIsChatVisible(false);
  };

  // Update the route mapping
  const routeComponents: { [key: string]: React.ReactNode } = {
    "/my-campign": <MyPosts />, // matan- to edit
    "/analytics": <GoogleAdsAnalytics />,
    "/settings/account": <AccountSettings />,
    "/settings/business-settings": <BusinessSetting />,
    "/plans": <PlansPage />,
    "/feed": <MainFeed />,
    "/chats":
      user && accessToken ? (
        <div style={{ position: "relative", height: "100%" }}>
          <ChatList
            currentUser={user}
            token={accessToken}
            onSelectUser={handleSelectUser}
          />
          {selectedChatUser && isChatVisible && (
            <ChatModal
              token={accessToken}
              currentUser={user}
              selectedUser={selectedChatUser}
              onClose={handleCloseChat}
            />
          )}
        </div>
      ) : (
        <div>Please log in to access chat</div>
      ),
  };

  const CurrentComponent = routeComponents[router.pathname];

  // Add a log in the render to track state changes

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={null}
    >
      <DashboardLayout
        branding={null}
        slots={{
          appTitle: () => (
            <div>
              <img
                src={logo}
                alt="App Logo"
                style={{
                  height: "80px",
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </div>
          ),
        }}
      >
        <PageContainer sx={{ padding: "0px", margin: "0px", width: "100%" }}>
          {CurrentComponent}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
