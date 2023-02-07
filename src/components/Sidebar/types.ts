import React from "react";

export interface ISidebarItem {
  text: string;
  link: string;
  icon: React.ReactNode;
  devOnly?: boolean;
}
export interface ISidebarBlock {
  items: ISidebarItem[];
  title: string;
}
