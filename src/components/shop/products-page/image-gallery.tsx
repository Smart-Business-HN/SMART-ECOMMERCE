'use client'
import { ImageGalleryItem } from "@/app/shop/category/[categorySlug]/[subCategorySlug]/[productSlug]/page";
import ImageGallery from "react-image-gallery";
interface IImageGalleryItems {
    images: ImageGalleryItem[],
}
export default function ImageGalleryForProductDetailPage (props: IImageGalleryItems) {
    return (
        <ImageGallery
                      items={props.images}
                      infinite={true}
                      showNav={false}
                      thumbnailPosition='left'
                      showFullscreenButton={true}
                      showPlayButton={false}
                    />
    );
}