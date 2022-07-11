const API = "https://youtube-v31.p.rapidapi.com/search?channelId=UCMYPtnaZAFHETOknwvqw2qQ&part=snippet%2Cid&order=date&maxResults=5";
const content = null || document.getElementById("content");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8076b75a25msh024ce2a2efda696p130146jsnbf7b3dd6ac75',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetcData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetcData(API);
        let view = `
            ${videos.items.map(video => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
            `).slice(0,4).join("")}  
        `;
        content.innerHTML = view;
    } catch (err){
        content.innerHTML = "<h2>Error al cargar</h2>"
        console.log(err);
    }
})();