"use client"

import * as React from "react"
import { router } from "@inertiajs/react"
import  useMediaQuery from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateSupplierModal() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [logoUrl, setLogoUrl] = React.useState("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    router.post("/suppliers", { name, logoUrl }, {
      onSuccess: () => {
        setOpen(false)
        setName("")
        setLogoUrl("")
        // Optionally redirect to edit page if backend returns `user.id`
        // router.visit(`/users/${newUserId}/edit`)
      },
    })
  }

  const onLogoAdded = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          setLogoUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
  }

  const Form = (
    <form onSubmit={handleSubmit} className="grid items-start gap-6 px-4">
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div> 

      <div className="grid gap-3">
        <Label htmlFor="logo">Logo</Label>
        <Input
          id="logo_path"
          type="file"
          onChange={onLogoAdded}
          required
        />

              {logoUrl && (
        <img
          src={logoUrl}
          alt="Uploaded Preview"
          className="mt-4 max-w-xs rounded-md border border-gray-300"
        />
      )}
      </div>         
      <Button type="submit">Create</Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Supplier</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Supplier</DialogTitle>
            <DialogDescription>
              Enter the name
            </DialogDescription>
          </DialogHeader>
          {Form}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Create Supplier</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Supplier</DrawerTitle>
          <DrawerDescription>
            Enter the name
          </DrawerDescription>
        </DrawerHeader>
        {Form}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}