import { Logo } from "./Logo";
import { Sidebar } from "./Sidebar";

export function Header() {
  return (
    <>
      <header className="w-full py-5 px-5 flex items-center justify-center bg-gray-700 border-b border-gray-600 gap-2">
        <Logo />
        <strong>Ignite Lab</strong>
      </header>
    </>
  );
}
