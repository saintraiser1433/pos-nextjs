'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  LayoutDashboard,
  ShoppingCart,
  SquareTerminal,
  PackageOpen,
  Weight,
  Banknote,
  UserRound,
  ArrowLeftRightIcon,
  ShoppingBag,
  Rotate3D,
  Shield,
  Warehouse,
  ClipboardCheck,
  Currency,
  CurrencyIcon,
  Bitcoin,
  Languages,
  LayoutPanelLeft,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavSecondary } from './nav-secondary';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Next POS Gen',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  dashboard: [
    {
      title: 'Dashboard',
      url: '#',
      icon: SquareTerminal,
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/product',
      icon: LayoutDashboard,
      isCollapsible: false,
    },
    {
      title: 'Inventory',
      url: '#',
      icon: PackageOpen,
      // isActive: true,
      isCollapsible: true,
      items: [
        {
          title: 'Products',
          url: '#',
        },
        {
          title: 'Categories',
          url: '#',
        },
        {
          title: 'Variations',
          url: '#',
        },
        {
          title: 'Brands',
          url: '#',
        },
        {
          title: 'Units',
          url: '#',
        },
        {
          title: 'Base Units',
          url: '#',
        },
        {
          title: 'Print Barcode',
          url: '#',
        },
      ],
    },
    {
      title: 'Purchases',
      url: '#',
      icon: ShoppingCart,
      isCollapsible: true,
      items: [
        {
          title: 'Purchases',
          url: '#',
        },
        {
          title: 'Purchases Returns',
          url: '#',
        },
      ],
    },
    {
      title: 'Sales',
      url: '#',
      icon: Weight,
      isCollapsible: true,
      items: [
        {
          title: 'Sales',
          url: '#',
        },
        {
          title: 'Sales Returns',
          url: '#',
        },
      ],
    },
    {
      title: 'Expenses',
      url: '#',
      icon: Banknote,
      isCollapsible: true,
      items: [
        {
          title: 'Expenses',
          url: '#',
        },
        {
          title: 'Expense Categories',
          url: '#',
        },
      ],
    },
    {
      title: 'Peoples',
      url: '#',
      icon: UserRound,
      isCollapsible: true,
      items: [
        {
          title: 'Suppliers',
          url: '#',
        },
        {
          title: 'Customers',
          url: '#',
        },
        {
          title: 'Users',
          url: '#',
        },
      ],
    },
    {
      title: 'Adjustments',
      url: '/product',
      icon: ArrowLeftRightIcon,
      isCollapsible: false,
    },
    {
      title: 'Quotations',
      url: '/product',
      icon: ShoppingBag,
      isCollapsible: false,
    },
    {
      title: 'Transfers',
      url: '/product',
      icon: Rotate3D,
      isCollapsible: false,
    },
    {
      title: 'Roles/Permissions',
      url: '/product',
      icon: Shield,
      isCollapsible: false,
    },
    {
      title: 'Warehouse',
      url: '/product',
      icon: Warehouse,
      isCollapsible: false,
    },
    {
      title: 'Reports',
      url: '/product',
      icon: ClipboardCheck,
      isCollapsible: false,
    },
    {
      title: 'Currencies',
      url: '/product',
      icon: Bitcoin,
      isCollapsible: false,
    },
    {
      title: 'Language',
      url: '/product',
      icon: Languages,
      isCollapsible: false,
    },

    {
      title: 'Settings',
      url: '/product',
      icon: Settings2,
      isCollapsible: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
