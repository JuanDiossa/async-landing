const API = "https://spotify23.p.rapidapi.com/artist_albums/?id=3ygJTpJJIK7eEeC2EFRl9D&offset=0&limit=100";
const content = null || document.getElementById("content-music");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8076b75a25msh024ce2a2efda696p130146jsnbf7b3dd6ac75',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

async function fetcData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const albums = await fetcData(API);
        let view = `
            ${albums.data.artist.discography.albums.items.map(album => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${album.releases.items[0].coverArt.sources[2].url}" alt="${album.releases.items.name}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${album.releases.items[0].name}
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