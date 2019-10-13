function getUserRepos(userHandle){
    console.log(`get ${userHandle} repos`);
    const url = `https://api.github.com/users/${userHandle}/repos`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            console.log(responseJson);
            displayResults(responseJson);
        })
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseObj){
    //need to get the name and html_url from the object
    $('.search-results').empty();

    for (let i = 0; i < responseObj.length; i++) {
        // console.log(`<li>${responseObj[i].name}: <a href="${responseObj[i].html_url}">${responseObj[i].html_url}</li>`)
        $('.search-results').append(
            `<li>${responseObj[i].name}: <a href="${responseObj[i].html_url}">${responseObj[i].html_url}</li>`
        );
    };
    
    $('.search-results').removeClass('hidden');
}

function formSubmit() {
    $('#js-form-handle').on('submit', function(event) {
        event.preventDefault();
        const searchHandle = $('#search-handle').val();
        getUserRepos(searchHandle);
    });
}

function handlePage() {
    formSubmit();
}

$(handlePage);