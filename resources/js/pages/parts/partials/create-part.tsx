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

export function CreatePartModal() {
  const [open, setOpen] = React.useState(false)
  const [part_number, setPartNumber] = React.useState("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    router.post("/parts", { part_number }, {
      onSuccess: () => {
        setOpen(false)
        setPartNumber("")
        // Optionally redirect to edit page if backend returns `user.id`
        // router.visit(`/users/${newUserId}/edit`)
      },
    })
  }

  const Form = (
    <form onSubmit={handleSubmit} className="grid items-start gap-6 px-4">
      <div className="grid gap-3">
        <Label htmlFor="name">Part Number</Label>
        <Input
          id="part_number"
          value={part_number}
          onChange={(e) => setPartNumber(e.target.value)}
          required
        />
      </div>   
      <Button type="submit">Create</Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Part</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Part</DialogTitle>
            <DialogDescription>
              Enter the part number
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
        <Button>Create Part</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Paet</DrawerTitle>
          <DrawerDescription>
            Enter the part number
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