'use client'
import $ from 'jquery';
const { PUBLIC_CLOUDINARY_CLOUD_NAME,PUBLIC_CLOUDINARY_API_KEY,UPLOAD_PRESET } = process.env;
export default function UploadImage(file: File, callback) {
    try {

        const form = new FormData();
        form.append("file", file, file.name);

        form.append("upload_preset", UPLOAD_PRESET);
        form.append("public_id", `${file.name}`);
        form.append("api_key", PUBLIC_CLOUDINARY_API_KEY);

        $.ajax(`https://api.cloudinary.com/v1_1/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            "url": `https://api.cloudinary.com/v1_1/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form,
            success: (data) => {
                const parse = JSON.parse(data);
                console.log('Image uploaded successfully:', parse['secure_url']);
                callback(parse)

            }
        }).catch((t, u) => {
            console.log(t, u)
            callback(null)
        });


    } catch (error) {
        console.error('Upload error:', error)
        //alert('Failed to upload image. Please try again.')
    } finally {
        console.log('Finished operation')
    }
}