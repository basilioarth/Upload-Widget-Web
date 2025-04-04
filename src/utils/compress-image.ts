interface CompressImageParams {
    file: File,
    maxWidth?: number
    maxHeight?: number
    quality?: number
}

function convertToWebp(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.')

    if (lastDotIndex === -1) {
        return `${filename}.webp`;
    }

    return `${filename.substring(0, lastDotIndex)}.webp`
}

export function compressImage({
    file,
    maxWidth = Number.POSITIVE_INFINITY,
    maxHeight = Number.POSITIVE_INFINITY,
    quality = 1
}: CompressImageParams) {
    const allowedFileTypes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp',
    ]

    if (!allowedFileTypes.includes(file.type)) {
        throw new Error('Image format not supported.')
    }

    return new Promise<File>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = event => {
            const compressed = new Image()

            compressed.onload = () => {
                const canvas = document.createElement('canvas')

                let width = compressed.width // Largura original da imagem
                let height = compressed.height // Altura original da imagem

                if (width > height) { // Imagem mais larga do que alta
                    if (width > maxWidth) {
                        height *= maxWidth / width // A altura está diminuindo proporcionalmente à largura máxima
                        width = maxWidth // Limitando a largura à largura máxima
                    }
                } else { // Imagem mais altra do que larga
                    if (height > maxHeight) {
                        width *= maxHeight / height // A largura está diminuindo proporcionalmente à alktura máxima
                        height = maxHeight // Limitando a altura à altura máxima
                    }
                }

                canvas.width = width
                canvas.height = height

                const context = canvas.getContext('2d')

                if (!context) {
                    reject(new Error('Failed to get canvas context.'))
                    return
                }

                context.drawImage(compressed, 0, 0, width, height)

                canvas.toBlob(
                    blob => {
                        if (!blob) {
                            reject(new Error('Failed to compress image.'))
                            return
                        }

                        const compressedFile = new File(
                            [blob],
                            convertToWebp(file.name),
                            {
                                type: 'image/webp',
                                lastModified: Date.now()
                            }
                        )

                        resolve(compressedFile)
                    },
                    'image/webp',
                    quality,
                )
                /**
                 * Blob é uma representação binária da imagem
                 */
            }

            compressed.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
    })
}