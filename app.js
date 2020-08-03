const apiData = {
    url: 'https://swapi.dev/api/people/'
}

const {url} = apiData

const apiUrl = `${url}`

fetch(apiUrl)
    .then( (data) => {
        if(data.ok) return data.json()
        throw new Error('Response not OK.'); 
    })
    .then( heroes => generateHtml(heroes.results))
    .catch( error => console.error('Error:', error))


const generateHtml = (data) => {
    //initialized template
    let generatedData = ``;
    data.forEach(data => {
        let id = data.url.split('/')[5]
        //generated template(all tbody data)
        generatedData = generatedData + 
        `<tr>
            <td>${data.name}</td>
            <td>${data.birth_year}</td>
            <td>${data.gender}</td>
            <td class="hero_${id}">${getHomePlanetName(data.homeworld, id)}</td>
            <td class="hero_${id}"><button onclick="deleteHero(this)" class="custom_btn btn_del">Delete</button></td>
        </tr>`
    })
    //gets tbody element ant fills it with generated data
    const heroesData = document.querySelector('.heroes_body')
    heroesData.innerHTML = generatedData
}

const getHomePlanetName = (homeworldEndPoint, id) => {
    fetch(homeworldEndPoint)
    .then( (data) => {
        if(data.ok) return data.json()
        throw new Error('Response not OK.'); 
    })
    .then( (data) => {
        //gets td element by the class which has hero's id
        const homeWorld = document.querySelector('.hero_' + id)
        homeWorld.innerHTML = data.name
    })
    .catch( error => console.error('Error:', error))
}

const addNewHero = () => {
    //get values all values
    let name = document.querySelector('.hero_name').value
    let birth = document.querySelector('.hero_birth').value
    let gender = document.querySelector('.hero_gender').value
    let world = document.querySelector('.hero_world').value

    //if one of the inputs is empty - stop executing function
    if(name.length == 0 || birth.length == 0 || gender.length == 0 || world.length == 0)
        return

    //template for the new row
    let generateNewHeroTemplate = 
    `
    <tr>
        <td>${name}</td>
        <td>${birth}</td>
        <td>${gender}</td>
        <td>${world}</td>
        <td><button onclick="deleteHero(this)" class="custom_btn btn_del">Delete</button></td>
    </tr>
    `

    //table reference
    let tableRef = document.querySelector('.heroes_data').getElementsByTagName('tbody')[0]
    
    //add generated template to the new row
    let newRow = tableRef.insertRow(tableRef.rows.length)
    newRow.innerHTML = generateNewHeroTemplate
}

const deleteHero = (element) => {
    //deletes selected row
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
}

const findHero = () => {
    var input, filter, table, tr, td, selected_td, i, j, txtValue;
    input = document.querySelector(".search_field");
    filter = input.value.toUpperCase();
    table = document.querySelector(".heroes_data");
    tr = table.getElementsByTagName("tr");

    //loops through all tr tags
    for (i = 0; i < tr.length; i++) {
        //gets all td inside current tr  
        td = tr[i].getElementsByTagName("td");
        //loops through all td tags
        for(j = 0; j < td.length; j++) {
            selected_td = td[j];
            if (selected_td) {
                txtValue = selected_td.textContent || selected_td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }      
    }
}