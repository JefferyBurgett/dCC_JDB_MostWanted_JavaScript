/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'Info' (I), 'Family' (F), or 'Descendants' (D)?\nType the option you want or type 'Restart' (R) or 'Quit' (Q).`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "Info":
        case "I":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "Family":
        case "F":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "Descendants":
        case "D":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "Restart":
        case "R":
            // Restart app() from the very beginning
            app(people);
            break;
        case "test":
            break;

        case "Quit":
        case "Q":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", charsLetters);
    let lastName = promptFor("What is the person's last name?", charsLetters);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `ID: ${person.id}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;

    return personInfo;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    //alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
//charFilters
function charsLetters(input){
    let validLetters = /[^a-zA-Z]{1,}/g;
        if(!validLetters.test(input) || input === "eye color" || input === "date of birth"){
            return true; 
        }
    else{
        alert("Please enter only valid characters.\nAccepted characters:\nletters");
        return false;
    }
}
function charsNumbers(input){
    let validNumbers = /[^-/.0-9]{1,}/g;
        if(!validNumbers.test(input)){
            return true;
    }
    else{
        alert("Please enter only valid characters.\nAccepted characters:\nnumbers, / or . or - (for dates)");
        return false;
    }
}
// End of charsFilters

// ////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding!!!



function findPersonFamily(person, people){
    let newArray = []
    let personParents = []
    let personSiblings = []
    let personSpouse
    
    personParents = findPersonParents(person, people)
    personSpouse = findPersonSpouse(person, people)
    personSiblings = findPersonSiblings(person, people)
    
    if (personParents != null) {
        for(let i = 0; i < personParents.length; i ++) {
            newArray += `Parents: ${personParents[i].firstName} ${personParents[i].lastName}\n`
        }
    }
    if (personSiblings != null) {
        for(let i = 0; i < personSiblings.length; i ++) {
            newArray += `Siblings: ${personSiblings[i].firstName} ${personSiblings[i].lastName}\n`
        }
    }
    if (personSpouse != null) {
        for(let i = 0; i < personSpouse.length; i ++) {
            newArray += `Spouse: ${personSpouse[i].firstName} ${personSpouse[i].lastName}\n`
        }
    }
    
   return newArray;
  }

  //End of findPersonFamily

function findPersonParents(person, people){
let personParents = people.filter(function(newPerson){
    if((person.parents).includes(newPerson.id)){
    return true
    }
})
// console.log('person:', person, 'personParents:', personParents)

return personParents
}
//End of findPersonParents

function findPersonSpouse(person, people){
let personSpouse = people.filter(function(newPerson){
    if(person.currentSpouse === newPerson.id){
        return true
    }
    })
// console.log('person:', person, 'personSpouse:', personSpouse)

return personSpouse
}
//End of findPersonSpouse

function findPersonSiblings(person, people){
let personSiblings = []
for(let i = 0; i < person.parents.length; i++) {
    personSiblings = people.filter(function(newPerson){
    if(newPerson.parents?.includes(person.parents[i])){
        return true
    }
        })
    }
// console.log('person:', person, 'personSiblings:', personSiblings)
    return personSiblings
}
//End of findPersonSiblings


