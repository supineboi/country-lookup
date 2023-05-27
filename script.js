// select option 
function select(name,country_code,capital){
    let aValue = name + ' (' + country_code + ') ' + capital;
    $('.aField').val(aValue);
    $('.autoComplete-container').html('');
}

// make auto filler structure on UI
function autoFillerMaker(data){
    $('.autoComplete-container').html('');
    data.map( (d)=> {
        $('.autoComplete-container').prepend(
            `<div class="autoComplete-fields" onclick="select('${d.name}','${d.country_code}','${d.capital}')">
                <div>
                    <span>${d.name}</span> (
                    <span>${d.country_code}</span>) 
                    <span class="capital">${d.capital}</span>
                </div>
                <div>
                    <span class="latlng">Lat:<span>${d.latlng[0]}</span></span>
                    <span class="latlng">/Long:<span>${d.latlng[1]}</span></span>
                </div>
            </div>`
        )
    })
}

// Filter out the on the basis of enter text
function autoFiller(typeText,data){
    data = data.filter( (country) => {
        if(country.name.toLowerCase().includes(typeText.toLowerCase()) || 
        country.country_code.toLowerCase().includes(typeText.toLowerCase()))
            return true
        return false;
    })
    autoFillerMaker(data);
}

// fetching all the data from api
let api = fetch("https://mocki.io/v1/6668c332-1f37-4f40-82d7-9d90e9e6fe7c");

api.then( (response) => response.json())
.then( (data) => {
    let searchElement = document.getElementById('field')
    searchElement.addEventListener('input', (event) => {

    let  searchText = event.target.value;
    if(searchText){
        autoFiller(searchText,data);
    }
    else
    $('.autoComplete-container').html('');
})
})