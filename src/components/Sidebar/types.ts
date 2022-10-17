import React from "react";

export interface ISidebarItem {
  text: string,
  link: string,
  icon: React.ReactNode,
}
export interface ISidebarBlock {
  items: ISidebarItem[],
  title: string
}