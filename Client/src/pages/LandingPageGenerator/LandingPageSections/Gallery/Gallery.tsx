import { useState } from "react";
import galleryStyle from "./Gallery.module.css";

export default function Gallery() {
    const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);

    const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(event.target.files[0]);
            setImages(newImages);
        }
    };

    return (
        <section className={galleryStyle.galleryContainer}>
            <div className={galleryStyle.imageGrid}>
                {images.map((image, index) => (
                    <div key={index} className={galleryStyle.imageBox}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageUpload(index, event)}
                            className={galleryStyle.uploadInput}
                            id={`upload-${index}`}
                        />
                        <label htmlFor={`upload-${index}`} className={galleryStyle.uploadLabel}>
                            {image ? (
                                <img src={image} alt={`Uploaded Preview ${index + 1}`} className={galleryStyle.image} />
                            ) : (
                                <span className={galleryStyle.uploadText}>+</span>
                            )}
                        </label>
                    </div>
                ))}
            </div>
        </section>
    );
}
