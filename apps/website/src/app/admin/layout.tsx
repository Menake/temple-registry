import "@/app/globals.css";
import { AdminSidebar } from "@/components/admin/sidebar";
import {  SignedOut, RedirectToSignIn, SignedIn } from "@clerk/nextjs";
import { checkRole } from "@/lib/roles";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
      <SignedIn>
        <SignedInView>
          {children}
        </SignedInView>
      </SignedIn>  
    </>
  );
}

const SignedInView = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isAdmin = await checkRole('admin');

  if (!isAdmin) return (
    <div>
      You do not have permission to view this page
    </div>
  );
  
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1">
        <main>{children}</main>
      </div>
    </div>
  )
}
