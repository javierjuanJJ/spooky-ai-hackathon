'use client'
const {
    REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME,
} = process.env;

export function VideoTransform(parse, spookyQuantity, callback) {
    const publicId = parse['public_id']
    console.log("Public_id a publicar: ", publicId)

    let url = `https://res.cloudinary.com/${REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/`

    if (spookyQuantity >= 2){
        url+= `e_sepia,e_blur:2/`
    }

    if (spookyQuantity >= 4){
        url+= `l_audio:slime_aumx9g.mp3/`
    }

    if (spookyQuantity >= 8){
        url+= `co_rgb:14D414,l_text:trebuchet%20ms_200_normal_left:Boo/fl_layer_apply,g_center,y_4/`
    }

    url += `${publicId}.mp4`
    callback(url)
    //callback(`https://res.cloudinary.com/${REACT_APP_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/video/e_gen_background_replace:prompt_${(convertToUrl(PROMPTS,spookyQuantity))}/${publicId}.jpg`)
}