import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { FiUpload } from "react-icons/fi";
import { ImageCard } from "./ImageCard";
import { useForm } from "react-hook-form";

interface Props {
  name: string;
  images: File[];
  setImages: any;
}

export function ImageInput(props: Props) {
  const { name, images, setImages } = props;

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setImages([...images, image]);
    }
  };

  const handleRemove = (imageName: string) => {
    setImages((prevImages: File[]) =>
      prevImages.filter((image) => image.name !== imageName)
    );
  };

  return (
    <>
      <button
        className={styles.imageButton}
        type="button"
        onClick={handleClick}
      >
        <FiUpload size={30} className={styles.icon} />
        Clique ou arraste para adicionar sua imagem
      </button>
      <input
        name={name}
        key={images.length}
        id={name}
        className={styles.imageInput}
        type="file"
        accept="image/png, image/jpeg"
        ref={imageInputRef}
        onChange={handleChange}
      />
      <div className={styles.images}>
        {images.map((image) => (
          <ImageCard key={image.name} image={image} onRemove={handleRemove} />
        ))}
      </div>
    </>
  );
}
