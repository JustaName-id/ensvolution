"use client"

import {useEffect, useState} from 'react';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';
import {Search, Moon, Sun} from 'lucide-react';
import {Button} from '@workspace/ui/components/button';
import {Input} from '@workspace/ui/components/input';
import {useJustWeb3} from "@justweb3/widget";
import {useTheme} from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@workspace/ui/components/dropdown-menu";
import {useJustWeb3Theme} from '@justweb3/ui';
import {useMounted} from "@/hooks/use-mounted";
import {ensSchema} from "@/schemas/ens.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@workspace/ui/components/form";
import Image from "next/image";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps>  = ()=> {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ensName, setEnsName] = useState(searchParams.get('name') || '');
  const {openEnsProfile} = useJustWeb3();
  const {setTheme, resolvedTheme} = useTheme();
  const {changeTheme, color} = useJustWeb3Theme();
  const form = useForm<z.infer<typeof ensSchema>>({
    resolver: zodResolver(ensSchema),
    defaultValues: {
      ensName: ensName,
    },
  })

  const mounted = useMounted();
  const dark = "hsl(0, 0%, 0%)";
  const light = "hsl(0, 0%, 100%)";

  const onSubmit = (data: z.infer<typeof ensSchema>) => {
    const params = new URLSearchParams(searchParams);
    params.set('name', data.ensName.trim());
    setEnsName(data.ensName.trim());
    router.push(`${pathname}?${params.toString().toLowerCase()}`);
  }

  
  useEffect(() => {
    if (resolvedTheme === "light" && color.background !== light) {
      changeTheme("background", light);
    }
    if (resolvedTheme === "dark" && color.background !== dark) {
      changeTheme("background", dark);
    }
  }, [resolvedTheme, mounted, color]);

  useEffect(() => {
    if(color.background === light && color.primary !== dark){
      changeTheme("primary", dark);
    }
    if(color.background === dark && color.primary !== light){
      changeTheme("primary", light);
    }
  }, [color]);

  return (
      <div className="bg-background text-foreground px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between z-10 border-foreground/20 border-b">
        
        <div className="flex flex-row mb-4 sm:mb-0 sm:flex-col w-full place-content-between">
          {/*<h1 className="text-xl font-bold">ENSvolution</h1>*/}
          <Image src={'/static/ensvolution.png'} alt={"logo"} width={100} height={30} />
          <div className="block sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="ml-auto sm:ml-0">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        
        <div className="flex flex-row sm:items-center gap-3 ">
            <Button
                variant="default"
                className=" h-[22px]  "
                onClick={() => openEnsProfile(ensName, 1)}
            >
              View Profile
            </Button>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 w-full sm:w-auto">
              <FormField
                  control={form.control}
                  name="ensName"
                  render={({ field }) => (
                      <FormItem className={"flex-1 sm:min-w-[200px]"}>
                        <FormControl>
                          <Input placeholder="nick.eth" {...field} className={"h-[38px] min-w-30 flex-1 box-border!"} />
                        </FormControl>
                      </FormItem>
                  )}
              />
                <Button type="submit" variant="secondary" size="icon" className={"h-[38px] w-[38px]"}>
                  <Search className="h-6 w-6" />
                </Button>
            </form>
          </Form>

          
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="ml-auto sm:ml-0">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
        </div>
      </div>
  );
}

export default Navbar;