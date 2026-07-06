'use client';

import Menu from "./components/menu";
import "./global-styles/reset.scss";
import ProfileModal from "./components/modals/profile";
import LoaderComponent from "./components/loader";
import { Provider } from "react-redux";
import { store } from "@/store";
import Toast from "./components/modals/toast";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Menu />
      <ProfileModal />
      <Toast />
      {children}
      <LoaderComponent />
    </Provider>
  );
}