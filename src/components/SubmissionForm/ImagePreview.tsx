import React, { useEffect, useState } from "react";

// Props definition
type Props = {
    file: File | null,
    fallbackImageUrl: string
};

const ImagePreview: React.FC<Props> = props => {
    const { file, fallbackImageUrl } = props;
    const [imageSrc, setImageSrc] = useState<string>("");

    useEffect(() => {
        if (file && file instanceof File) {
            // Check if the file is an image
            const imageType = /^image\//;

            if (imageType.test(file.type)) {
                // if file is an image, create a temporary URL for the file
                const tempUrl = URL.createObjectURL(file);
                setImageSrc(tempUrl);

                // Remember to revoke the object URL after the image is loaded to release memory
                return () => {
                    URL.revokeObjectURL(tempUrl);
                };
            }
        }

        // If the file is not an image, or no file is provided, use the fallback image URL
        setImageSrc(fallbackImageUrl);

        // If there's no cleanup function needed, you can omit the return statement
    }, [file, fallbackImageUrl]);

    return (
        <img
            src={imageSrc}
            className="image-preview"
        />
    );
};

export default ImagePreview;