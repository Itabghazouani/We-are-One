import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-afb3b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input-field-el")
const btnEl = document.getElementById("btn-el")
const endorsementListEl = document.getElementById("endorsement-list-el")

console.log(inputFieldEl)

btnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(endorsementListInDB, inputValue)
    clearInputField()
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsList = Object.entries(snapshot.val())

        clearEndorsementList()

        for(let i = 0; i < endorsementsList.length; i++) {
            let currentEndorsement = endorsementsList[i]
            let currentEndorsementID = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]

            appendItemToEndorsementList(currentEndorsement)
        }
    } else {
        endorsementListEl.innerHTML = "Waiting for your endorsements! Let's spread the good energy in the team!"
    }
})

function clearInputField() {
    inputFieldEl.value = ""
}

function clearEndorsementList() {
    endorsementListEl.innerHTML = ""
}

function appendItemToEndorsementList(endorsement) {
    let endorsementID = endorsement[0]
    let endorsementValue = endorsement[1]

    let newEl = document.createElement("li")

    newEl.textContent = endorsementValue

    endorsementListEl.append(newEl)
}

inputFieldEl.addEventListener("click", function() {
    clearInputField()
})
