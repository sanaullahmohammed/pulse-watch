import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Activity, Server, Bell, Users, Settings, LogOut } from "lucide-react";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: "Overview", href: "/", icon: Activity },
    { name: "Services", href: "/services", icon: Server },
    { name: "Incidents", href: "/incidents", icon: Bell },
    { name: "Team", href: "/team", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">Status Page</h1>
        </div>

        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={
                    location.pathname === item.href ? "secondary" : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.href && "bg-gray-100"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 px-4 w-64">
          <Button variant="ghost" className="w-full justify-start text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
