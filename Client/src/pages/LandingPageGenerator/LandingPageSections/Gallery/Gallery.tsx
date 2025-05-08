import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import galleryStyle from "./gallery.module.css";
import { useAuth } from "../../../../context/AuthContext";
import { businessInfoService } from "../../../../services/besinessInfo.service";
import { config } from "../../../../config";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const { user, accessToken } = useAuth();
  const userId = user?._id;

  if (!userId || !accessToken) return null;

  useEffect(() => {
    businessInfoService
      .getBusinessInfo(userId, accessToken)
      .then((data) => {
        const urls = data.data.businessImages.map((path: string) =>
          config.apiUrl + "/" + path
        );
        setImages(urls);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery images:", err);
      });
  }, [userId, accessToken]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...images];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);
  };

  return (
    <section className={galleryStyle.galleryContainer}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided) => (
            <div
              className={galleryStyle.imageGrid}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.length > 0 ? (
                images.map((url, index) => (
                  <Draggable key={url} draggableId={url} index={index}>
                    {(provided) => (
                      <div
                        className={galleryStyle.imageBox}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={url}
                          alt={`Gallery Image ${index + 1}`}
                          className={galleryStyle.image}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className={galleryStyle.noImages}>אין תמונות להצגה</div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
