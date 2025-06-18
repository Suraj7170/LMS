'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

function SideBar() {
  const MenuList = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Upgrade', icon: Shield, path: '/dashboard/upgrade' },
    { name: 'Profile', icon: UserCircle, path: '/dashboard/profile' },
  ];
  const {totalCourse, setTotalCourse} = useContext(CourseCountContext);
  const path = usePathname();

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col justify-between px-4 py-6">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 px-2 mb-10">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h2 className="text-2xl font-bold text-blue-600">EduVerse</h2>
        </div>

        {/* Create Button */}
        <Link href="/create">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer">
            + Create New
          </Button>
        </Link>

        {/* Navigation */}
        <div className="mt-8 space-y-2">
          {MenuList.map((menu, index) => {
            const isActive = path === menu.path;
            return (
              <Link key={index} href={menu.path}>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors 
                  ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <menu.icon size={20} />
                  <span>{menu.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Credit Info */}
      <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 mt-10">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Available Credits: <span className="font-bold text-black">5</span></h3>
        <Progress value={(totalCourse/5*100)} className="mb-2" />
        <p className="text-xs text-gray-600 mb-2">{totalCourse}  out of 5 credits used</p>
        <Link href="/dashboard/upgrade" className="text-sm text-blue-600 hover:underline">
          Upgrade to create more
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
