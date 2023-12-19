"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { Hint } from "../hint";
import Image from "next/image";

type Props = {
    initialName: string;
    initialThumbnailURL: string | null;
};

export const InfoModal = ({ initialName, initialThumbnailURL }: Props) => {
    const router = useRouter()
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailURL, setThumbnailURL] = useState(initialThumbnailURL);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailURL: null })
                .then(() => {
                    toast.success("Thumbnail removed")
                    setThumbnailURL('')
                    closeRef.current?.click()
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success("Stream updated");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Someting went wrong"));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            disabled={isPending}
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {
                            thumbnailURL ? (
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                    <div className="absolute top-2 right-2 z-[10]">
                                        <Hint label='Remove thumbnail' side="left" asChild>
                                            <Button
                                                type="button"
                                                disabled={isPending}
                                                onClick={onRemove}
                                                className="h-auto w-auto p-1.5">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </Hint>
                                    </div>
                                    <Image src={thumbnailURL} alt='thumbnail' fill className="object-cover" />
                                </div>
                            ) :
                                <div className="rounded-xl border outline-dashed outline-muted">
                                    <UploadDropzone endpoint="thumbnailUploader"
                                        appearance={{
                                            label: {
                                                color: "#ffffff"
                                            },
                                            allowedContent: {
                                                color: "#ffffff"
                                            }
                                        }}
                                        onClientUploadComplete={(res) => {
                                            setThumbnailURL(res?.[0].url)
                                            router.refresh()
                                            closeRef?.current?.click()
                                        }}
                                    />
                                </div>
                        }

                    </div>

                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
