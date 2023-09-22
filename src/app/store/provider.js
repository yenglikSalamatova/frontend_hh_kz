"use client";
import store from "@/app/store/index";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  return <Provider store={store}> {children} </Provider>;
}
