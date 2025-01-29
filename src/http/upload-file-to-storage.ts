import axios from "axios"

interface UploadFileToStorageParams {
    file: File
    onProgress: (sizeInBytes: number) => void
}

interface UploadFileToStorageOptions {
    signal?: AbortSignal
}

export async function uploadFileToStorage(
    { file, onProgress }: UploadFileToStorageParams,
    opts?: UploadFileToStorageOptions
) {
    const data = new FormData()

    data.append('file', file)

    const response = await axios.post<{ url: string }>('http://localhost:3333/uploads', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        signal: opts?.signal, // Pode ser utiliado em qualquer API da Web que seja assincrona
        onUploadProgress(progressEvent) {
            onProgress(progressEvent.loaded)
        },
    })

    return { url: response.data.url }
}