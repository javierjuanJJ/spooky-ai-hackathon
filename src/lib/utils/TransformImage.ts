'use client'
import {CloudinaryImage} from '@cloudinary/url-gen';
import {Effect, generativeReplace} from '@cloudinary/url-gen/actions/effect';
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
import {Resize} from '@cloudinary/url-gen/actions/resize';


export function ImageTransform(parse,spookyQuantity, callback) {
    const publicId = parse['public_id'] || ''
    console.log("Public_id a publicar: ", publicId)
    // Create a new CloudinaryImage instance with your cloud name
    console.log("Public_id a publicar: ", publicId)
    const apikey = process.env.PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
    const apiSecret = process.env.CLOUDINARY_API_SECRET ?? "";

    const cloudinaryImage = new CloudinaryImage(publicId, {
        cloudName: cloudName,
        apiKey: apikey,
        apiSecret: apiSecret
    });


    // 1. Ghost transformation - applies starting at level 3
    if (spookyQuantity >= 3) {
        cloudinaryImage.effect(
            generativeBackgroundReplace().prompt(
                "Change background by a haunted house's halloween and other things  by ghost and  animals by ghost too"
            )
        );
    }

    // 2. Add fog overlay at spookyQuantity level 5
    if (spookyQuantity >= 5) {
        cloudinaryImage
            .effect(
                generativeBackgroundReplace().prompt("Change all persons into a ghosts")
            );
    }

    // 3. Add slime overlay at spookyQuantity level 6
    if (spookyQuantity >= 6) {
        cloudinaryImage.effect(
            generativeBackgroundReplace().prompt(
                "add slime fog and terryfing sound effects over images"
            )
        ).resize(Resize.fill().width(600));
    }

    // 4. AI Background removal and haunted house background at level 7
    if (spookyQuantity >= 7) {

        cloudinaryImage.effect(
            generativeReplace().from("persons").to("ghosts")
        );
    }

    console.log(cloudinaryImage.toURL())
    console.log(cloudinaryImage)
    callback(cloudinaryImage)
}