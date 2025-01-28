import * as Collapsible from "@radix-ui/react-collapsible";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-uploadlist";
import { motion, useCycle } from "motion/react";
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button";

 export function UploadWidget() {
    const isThereAnyPendingUpload = true
    const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true) 
    /**
     * O elemento da esquerda é o valor padrão. O valor da direita é o valor para o qual o estado 
     * vai ser alterado quando chamarmos o toggle. Esse valor vai e volta a partir das interações do
     * usuário (como se fosse um ciclo mesmo).
     */

    return (
        <Collapsible.Root onOpenChange={() => toggleWidgetOpen()} asChild>
            {/**
             * O uso do asChild faz com que o Collapsible.Root não crie uma nova div, mas sim
             * mantenha a div abaixo (nesse caso a motion.div) como sendo a própria Collapsible.Root
             */}
            <motion.div
                data-progress={isThereAnyPendingUpload}
                className="bg-zinc-900 overflow-hidden max-w-[360px] rounded-xl data-[state=open]:shadow-shape border border-transparent animate-border data-[state=closed]:rounded-3xl data-[state=closed]:data-[progress=false]:shadow-shape data-[state=closed]:data-[progress=true]:[background:linear-gradient(45deg,#09090B,theme(colors.zinc.900)_50%,#09090B)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.zinc.700/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.zinc.600/.48))_border-box]"
                animate={isWidgetOpen ? "open" : "closed"}
                variants={{
                    closed: {
                        width: 'max-content',
                        height: 44, 
                        transition: {
                            type: 'tween',
                            duration: 0.2
                        }
                    },
                    open: {
                        width: 360,
                        height: 'auto',
                        transition: {
                            duration: 0.1,
                        }
                    }
                }}
            >
                {!isWidgetOpen && <UploadWidgetMinimizedButton />}
                <Collapsible.Content>
                    <UploadWidgetHeader />
                    <div className="flex flex-col gap-4 py-3">
                        <UploadWidgetDropzone />
                        <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />
                        <UploadWidgetUploadList />
                    </div>
                </Collapsible.Content>
            </motion.div>
        </Collapsible.Root>
    )
 }