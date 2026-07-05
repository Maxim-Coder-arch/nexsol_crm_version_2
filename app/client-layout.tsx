'use client';

import Menu from "./components/menu";
import "./global-styles/reset.scss";
import { ProfileProvider } from "./context/modalContext";
import ProfileModal from "./components/modals/profile";
import LoaderComponent from "./components/loader";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ProfileProvider>
        <Menu />
        <ProfileModal />
        {children}
        <LoaderComponent />
      </ProfileProvider>
    </Provider>
  );
}