'use client'
import $ from 'jquery';

export default function UploadImage(file: File, callback) {
    try {

        const form = new FormData();
        form.append("file", file, file.name);
        const apikey = process.env.PUBLIC_CLOUDINARY_API_KEY ?? "";
        const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
        const apiSecret = process.env.CLOUDINARY_API_SECRET ?? "";
        const uploadPreset = process.env.UPLOAD_PRESET ?? "";

        form.append("upload_preset", uploadPreset);
        form.append("public_id", `${file.name}`);
        form.append("api_key", apikey);

        $.ajax(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            "url": `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
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
        }).done(async function (response) {

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