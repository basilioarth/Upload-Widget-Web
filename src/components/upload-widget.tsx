import * as Collapsible from "@radix-ui/react-collapsible";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-uploadlist";
import { motion, useCycle } from "motion/react";
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button";

 export function UploadWidget() {
    const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true) 
    /**
     * O elemento da esquerda é o valor padrão. O valor da direita é o valor para o qual o estado 
     * vai ser alterado quando chamarmos o toggle. Esse valor vai e volta a partir das interações do
     * usuário (como se fosse um ciclo mesmo).
     */

    return (
        <Collapsible.Root onOpenChange={() => toggleWidgetOpen()}>
            <motion.div
                className="bg-zinc-900 overflow-hidden max-w-[360px] rounded-xl shadow-shape"
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