let createBtn = document.querySelector('#create-btn')
createBtn.addEventListener('click', event => createEnquete(event))

const createEnquete= () => {
    const main = document.querySelector('#main')//main.lastElementChild.innerHTML
    const nomValue= document.getElementById('name').value;
    const descriptionValue = document.getElementById('description').value;
    var newId = main.childElementCount + 1;
    if (document.getElementById('create-btn').innerText == "Ajouter"){
        if(confirm("Voulez-vous enregistrer vraiment?")){
            fetch('http://localhost:5000/enquete/', {
                method: 'POST',
                body: JSON.stringify({
                    nom: nomValue,
                    description: descriptionValue,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((r) => r.json())
                .then((resp) => {
                    const deleteButton = document.createElement('button')
                    deleteButton.addEventListener('click', event => remove( newId, event))
                    deleteButton.innerText = 'Supprimer'
                    deleteButton.className='btn btn-sm btn-danger'//border border-primary
                    const updateButton = document.createElement('button')
                    updateButton.addEventListener('click', event => update_btn(newId, event))
                    updateButton.innerText = 'Modifier'
                    updateButton.className='btn btn-sm btn-success'

                    const title = document.createElement('h4')
                    title.innerText = nomValue
                    const text = document.createElement('p')
                    text.innerText = descriptionValue
                    const div = document.createElement('div')
                    div.id = newId

                    div.appendChild(title)
                    div.appendChild(text)
                    div.appendChild(deleteButton)
                    div.appendChild(updateButton)
                    div.className="my-2 border border-primary rounded"
                    main.prepend(div)
                    document.getElementById('name').value="";
                    document.getElementById('description').value="";
                })
        }

    }
    else {
        var id_mofif=document.getElementById('num_hidden').value
        updateEnquete(id_mofif, nomValue, descriptionValue)

    }

}




const remove = (id, event) => {
    fetch(`http://localhost:5000/enquete/${id}`, {
        method: 'DELETE',
    })
    event.target.parentElement.remove()
}

const update_btn = (id,event) => {
    const post = event.target.parentElement
    const nameElement = post.getElementsByTagName('h4')[0].innerText
    const descriptionElement = post.getElementsByTagName('p')[0].innerText
    document.getElementById('name').value = nameElement;
    document.getElementById('description').value = descriptionElement;
    document.getElementById('create-btn').innerText = "Modifier";
    document.getElementById('titre_tache').innerText = "Modification d'enquete";
    document.getElementById('num_hidden').value = id;
    alert(id)
}

const updateEnquete = (id, nom, description) => {
    fetch(`http://localhost:5000/enquete/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            nom: nom,
            description: description,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((r) => r.json())
        .then((resp) => {
            const post = document.getElementById(id)
            const nameElement = post.getElementsByTagName('h4')[0]
            const descriptionElement = post.getElementsByTagName('p')[0]
            nameElement.innerText = nom
            descriptionElement.innerText = description
            document.getElementById('create-btn').innerText="Ajouter"
            document.getElementById('name').value="";
            document.getElementById('description').value="";
        })
}


const getPosts = () => {
    fetch('http://localhost:5000/enquete')
        .then(r => r.json())
        .then(posts => {
            renderPosts(posts)
        })
}

const renderPosts = (posts) => {
    const main = document.querySelector('#main')
    posts.forEach(post => {
        const deleteButton = document.createElement('button')
        deleteButton.addEventListener('click', event => remove(post.id, event))
        deleteButton.innerText = 'Supprimer'
        deleteButton.className='btn btn-sm btn-danger'//border border-primary
        const updateButton = document.createElement('button')
        updateButton.addEventListener('click', event => update_btn(post.id, event))
        updateButton.innerText = 'Modifier'
        updateButton.className='btn btn-sm btn-success'

        const title = document.createElement('h4')
        title.innerText = post.nom
        const text = document.createElement('p')
        text.innerText = post.description
        const div = document.createElement('div')

        div.id = post.id
        div.appendChild(title)
        div.appendChild(text)
        div.appendChild(deleteButton)
        div.appendChild(updateButton)
        div.className="my-2 border border-primary rounded"
        main.appendChild(div)
    })
}

document.addEventListener('DOMContentLoaded', function() {
    getPosts()
})
