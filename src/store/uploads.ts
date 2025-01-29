/**
 * Todo Store é um Hook e trata-se de um local onde podemos armazenar vários estados.
 */
import { create } from 'zustand';

export type Upload = {
    name: string
    file: File
}

type UploadState = {
    uploads: Map<string, Upload>
    addUploads: (files: File[]) => void
} // Fala quais informações teremos dentro desse estado.

export const useUploads = create<UploadState>((set, get) => {
/**
 * O set serve para fazer uma modificação no estado.
 * O get serve para buscar uma informação de dentro do estado. 
 */
    function addUploads(files: File[]) {
        for (const file of files) {
            const uploadId = crypto.randomUUID()

            const upload: Upload = {
                name: file.name,
                file,
            }

            set(state => {
                return { uploads: state.uploads.set(uploadId, upload) }
            })
        }
    }

    return {
        uploads: new Map(),
        addUploads
    }
})