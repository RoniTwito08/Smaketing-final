import { useState, useEffect } from "react";
import galleryStyle from "./gallery.module.css";
import { useAuth } from "../../../../context/AuthContext";
import { businessInfoService } from "../../../../services/besinessInfo.service";
import { config } from "../../../../config";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  
  const { user, accessToken } = useAuth();
  const userId = user?._id;

  if (!userId || !accessToken) return null;

  console.log("businessInfoService", businessInfoService.getBusinessInfo(userId, accessToken).then((data) => {
    console.log("data", data);
  }));

  useEffect(() => {
    if (userId && accessToken) {
      businessInfoService
        .getBusinessInfo(userId, accessToken)
        .then((data) => {
          // נניח ש־data.data.gallery הוא מערך של נתיבי קבצים
          const urls = data.data.businessImages.map((path: string) => 
            config.apiUrl + "/" + path
          );
          setImages(urls);
        })
        .catch((err) => {
          console.error("Failed to fetch gallery images:", err);
        });
    }
  }, [userId, accessToken]);

  if (!userId || !accessToken) return null;

  return (
    <section className={galleryStyle.galleryContainer}>
      <div className={galleryStyle.imageGrid}>
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className={galleryStyle.imageBox}>
              <img
                src={url}
                alt={`Gallery Image ${index + 1}`}
                className={galleryStyle.image}
              />
            </div>
          ))
        ) : (
          <div className={galleryStyle.noImages}>
            אין תמונות להצגה
          </div>
        )}
      </div>
    </section>
  );
}
