"use client";

import { DeleteTransaction } from "@/app/(dashboard)/transactions/_actions/deleteTransaction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  transactionId: string;
}

function DeleteTransactionDialog({ open, setOpen, transactionId }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteTransaction,
    onSuccess: async () => {
      toast.success("Transaction deleted successfully", {
        id: transactionId,
      });

      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: transactionId,
      });
    },
  });
 return (
   <AlertDialog open={open} onOpenChange={setOpen}>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>
           Êtes-vous sûr de vouloir continuer ?
         </AlertDialogTitle>
         <AlertDialogDescription>
           Cette action est irréversible. Cela supprimera définitivement votre
           transaction.
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel>Annuler</AlertDialogCancel>
         <AlertDialogAction
           onClick={() => {
             toast.loading("Suppression de la transaction en cours...", {
               id: transactionId,
             });
             deleteMutation.mutate(transactionId);
           }}
         >
           Continuer
         </AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
 );

}

export default DeleteTransactionDialog;
