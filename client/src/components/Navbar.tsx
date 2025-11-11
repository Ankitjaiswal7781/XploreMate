import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/XploreMate.png";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Car,
  Import,
  Loader2,
  Menu,
  Moon,
  PersonStanding,
  Search,
  ShoppingCart,
  Sun,
  User,
  UserSearch,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const { theme, setTheme } = useThemeStore();
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full bg-white\\/70 dark:bg-gray-900\\/70 border-b border-gray-200 dark:border-gray-700 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center w-96 bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-sm border border-gray-200 dark:border-gray-700 relative">
            <Input
              type="text"
              value={searchText}
              placeholder="Search guide by name, city & country"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search/${encodeURIComponent(searchText)}`);
                  setSearchText("");
                }
              }}
              className="pl-3 pr-10 py-1 h-8 bg-transparent text-sm text-black dark:text-white placeholder:text-gray-400 border-none outline-none ring-0 focus:ring-0 focus:outline-none"
            />
            <Button
              onClick={() => {
                navigate(`/search/${encodeURIComponent(searchText)}`);
                setSearchText("");
              }}
              variant="ghost"
              size="icon"
              className="absolute right-1 text-gray-600 dark:text-gray-300 hover:bg-purple-100 hover:text-purple-600 rounded-full p-2 transition-colors duration-200"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-black dark:text-white">
              <Link
                to="/"
                className="hover:text-fuchsia-900 transition font-medium ml-1"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="hover:text-fuchsia-900 transition font-medium"
              >
                My Profile
              </Link>
              <Link
                to="/booking/status"
                className="hover:text-fuchsia-900 transition font-medium"
              >
                Bookings
              </Link>

              {user?.admin && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>Dashboard</MenubarTrigger>
                    <MenubarContent>
                      <Link to="/admin/guides">
                        <MenubarItem>Local Guides</MenubarItem>
                      </Link>
                      <Link to="/admin/services">
                        <MenubarItem>Services</MenubarItem>
                      </Link>
                      <Link to="/admin/bookings">
                        <MenubarItem>Bookings</MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div>
                <div className="relative flex items-center space-x-2 transition-colors duration-500 ease-in-out">
                  <div className="flex items-center space-x-1">
                    <Sun
                      className={`h-5 w-5 transition-all duration-500 ${
                        theme === "dark"
                          ? "rotate-180 opacity-0"
                          : "rotate-0 opacity-100"
                      }`}
                    />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(val) => {
                        setTimeout(() => {
                          setTheme(val ? "dark" : "light");
                        });
                      }}
                      className="ml-2 data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-yellow-400 transition-all duration-500"
                    />
                    <Moon
                      className={`h-5 w-5 transition-all duration-500 ${
                        theme === "dark"
                          ? "rotate-0 opacity-100"
                          : "-rotate-180 opacity-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <Link to="/booking-summary" className="relative cursor-pointer">
                <ShoppingCart />
                {cart.length > 0 && (
                  <Button
                    size={"icon"}
                    className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-500"
                  >
                    {cart.length}
                  </Button>
                )}
              </Link>
              <Link to="/profile">
                <Avatar className="hover:ring-2 ring-fuchsia-950 transition cursor-pointer">
                  <AvatarImage src={user?.profilePicture} alt="profilePhoto" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                {loading ? (
                  <Button disabled className="bg-purple hover:bg-hoverPurple">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait!
                  </Button>
                ) : (
                  <Button
                    onClick={logout}
                    className="bg-purple hover:bg-hoverPurple"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden lg:hidden">
            {/* Mobile Responsive */}
            <MobileNavbar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const { setTheme } = useThemeStore();
  const { cart } = useCartStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <img src={Logo} alt="Logo" className="h-9" />
          </SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>My Profile</span>
          </Link>
          <Link
            to="/booking/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <Car />
            <span>My Bookings</span>
          </Link>
          <Link
            to="/booking-summary"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Booking review ({cart.length})</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/guides"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UserSearch />
                <span>Local Guides</span>
              </Link>
              <Link
                to="/admin/services"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PersonStanding />
                <span>Services</span>
              </Link>
              <Link
                to="/admin/bookings"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <Import />
                <span>Bookings</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Ankit Kumar</h1>
          </div>
          <SheetClose asChild>
            {loading ? (
              <Button disabled className="bg-purple hover:bg-hoverPurple">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait!
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-purple hover:bg-hoverPurple"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
