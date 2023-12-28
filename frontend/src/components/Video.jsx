// import { api } from "../utilities";
// import { useEffect, useState } from "react";

// export const CocktailVideo = ({ name }) => {
//     const [vidData, setVidData] = useState(null);

//     const getVidData = async () => {
//         try {
//             api.defaults.headers.common[
//         "Authorization"
//       ] = `Token ${localStorage.getItem("token")}`;
//             const response = await api.get(`myapi/vid/${name}/`);
//             setVidData(response.data)
//         } catch (error) {
//             console.error('Error getting video', error);
//         }
//     }

//     useEffect (() => {
//         getVidData();
//     }, [name])

//     return (
//         <div>
//             {vidData && vidData.items && vidData.items.length > 0 && vidData.items[0].id.videoId ? (
//                 <div>
//                     <iframe 
//                     width='560'
//                     height='315'
//                     src={`https://www.youtube.com/embed/${vidData.items[0].id.videoId}`}
//                     title={vidData.items[0].snippet.title}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     ></iframe>
//                 </div>
//             ) : null}
//         </div>
//     )
// }

import { api } from "../utilities";
import { useEffect, useState } from "react";

export const CocktailVideo = ({ name }) => {
    const [vidData, setVidData] = useState(null);

    const getVidData = async () => {
        try {
            api.defaults.headers.common[
        "Authorization"
      ] = `Token ${localStorage.getItem("token")}`;
            const response = await api.get(`myapi/vid/${name}/`);
            setVidData(response.data)
        } catch (error) {
            console.error('Error getting video', error);
        }
    }

    useEffect (() => {
        getVidData();
    }, [name])

    return (
        <div>
            {vidData && vidData.contents && vidData.contents.length > 0 && vidData.contents[0].video.videoId ? (
                <div>
                    <iframe 
                    width='560'
                    height='315'
                    src={`https://www.youtube.com/embed/${vidData.contents[0].video.videoId}`}
                    //title={vidData.items[0].snippet.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
            ) : null}
        </div>
    )
}