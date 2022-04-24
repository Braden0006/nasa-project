
function nasaRequested() {
    let title = document.querySelector('.title');
    let information = document.querySelector('.description');
    let img = document.querySelector('.space-photo');
    let video = document.querySelector('.space-video')
    let warning = document.querySelector('.photo-warning')
    let date = document.querySelector('.date');
    let dateInput = document.querySelector('.date-picker');
    let currentDate = new Date().toISOString().slice(0, 10)
    
    const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
    const apiKey = 'joLMLUkGGtGfVpF6eqK0EYDgKmS0ej5MgqWOrH58';
    let newDate = `&date=${dateInput.value}&`;

    // This function fetches the data from the nasa api
    function fetchData() {
        try {
            fetch(baseUrl+apiKey+newDate)
            .then((response) => response.json())
            .then(json => {
                console.log(json)
                displayData(json)
            });
        } catch(error) {
            console.log(error)
        }
    }
    
    // This function displays the data from the json onto the screen
    function displayData(data) {
        title.textContent = data.title;
        information.textContent  = data.explanation;

        if (data.media_type === 'video') {
            img.src = ''
            warning.textContent = 'Video Unavailable, Please choose another date'
        } else {
            warning.textContent = '';
            img.src = data.url;
        }


        date.textContent = data.date;
        dateInput.max = currentDate;
        dateInput.min = '1995-06-16'
    }

    date.textContent = dateInput.value;
    fetchData()

    dateInput.addEventListener('change', (e) => {
        e.preventDefault();
        nasaRequested();
    })
}


window.onload = nasaRequested();