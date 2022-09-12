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
            searchResults = searchSelection(people);
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
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info' (i), 'family' (f), or 'descendants' (d)?\nType the option you want or type 'restart' (r) or 'quit' (q).`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
        case "i":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
        case "f":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
        case "d":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
        case "r":
            // Restart app() from the very beginning
            app(people);
            break;
        case "test":
            break;

        case "quit":
        case "q":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

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
        if(!validLetters.test(input)) {
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

function removeLeadingZeros(input){
    let leadingZeroes = /^0+/;
    let subsequentleadingZeros = /[-/.]0+|[-.]/g;
    if(leadingZeroes.test(input) || subsequentleadingZeros.test(input)){
      input = input.replace(leadingZeroes, "");
      input = input.replace(subsequentleadingZeros, "/");
    }
  
    return input;
  }
//End of removeLeadingZeros


// ////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding!!!
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

function searchSelection(people){
    let possibleSearch = {}
    let query = promptFor("Do you want to search by a single trait (s) or multiple traits (m)?", charsLetters);
    switch(query) {
        case "single trait":
        case "s":
          possibleSearch = searchBySingleTrait(people);
          break;
        case "multiple traits":
        case "m":
          possibleSearch = searchByMultipleTraits(people);
          break;
    }
    return possibleSearch
}

function searchBySingleTrait(people){
    let query = promptFor("Do you want to search by gender (g), date of birth (d), height (h), weight (w), eye color (e), or occupation (o)? Type the option you want.", charsLetters);
    let possiblePersonnel = [];
    switch(query) {
        case "gender":
        case "g":
            possiblePersonnel = searchByGender(people);
            break;
        case "date of birth":
        case "d":
            possiblePersonnel = searchByDob(people);
            break;
        case "height":
        case "h":
            possiblePersonnel = searchByHeight(people);
            break;
        case "weight":
        case "w":
            possiblePersonnel = searchByWeight(people);
            break;
        case "eye color":
        case "e":
            possiblePersonnel = searchByEyeColor(people);
            break;
        case "occupation":
        case "o":
            possiblePersonnel = searchByOccupation(people);
            break;
        default:
        alert("Please enter a valid input.\n\nYou can type the full trait name or initial.\n\nExample:\n\"Date of Birth\" or \"D\" (without quotes)");
        return searchBySingleTrait(people);
    }
    if(possiblePersonnel.length > 1){
      alert(possiblePersonnel.length + " possible personnel remain:\n" + displayPeople(possiblePersonnel));
    }
    return possiblePersonnel;
}
  // End of searchbySingleTrait
  
function searchByMultipleTraits(people){
    let query = promptFor("Do you want to search by gender (g), date of birth (d), height (h), weight (w), eye color (e), occupation (o) or exit (x)? Type the option you want.", charsLetters);
    let possiblePersonnel = [];
    switch(query) {
        case "gender":
        case "g":
        possiblePersonnel = searchByGender(people);
        return searchByMultipleTraits(possiblePersonnel);
    case "date of birth":
    case "d":
        possiblePersonnel = searchByDob(people);
        return searchByMultipleTraits(possiblePersonnel);
    case "height":
    case "h":
        possiblePersonnel = searchByHeight(people);
        return searchByMultipleTraits(possiblePersonnel);
    case "weight":
    case "w":
        possiblePersonnel = searchByWeight(people);     
        return searchByMultipleTraits(possiblePersonnel);
    case "eye color":
    case "e":
        possiblePersonnel = searchByEyeColor(people);       
        return searchByMultipleTraits(possiblePersonnel);
    case "occupation":
    case "o":
        possiblePersonnel = searchByOccupation(people);
        return searchByMultipleTraits(possiblePersonnel);
    case "exit":
    case "x":
        break;
    default:
        alert("Please enter a valid input.\n\nYou can type the full trait name or initial.\n\nExample:\n\"date of birth\" or \"d\" (without quotes)");
        
        }
    if (possiblePersonnel.length > 1){
        alert(possiblePersonnel.length + " possible personnel remain:\n" + displayPeople(possiblePersonnel));

    }
        
        
    return possiblePersonnel;
    }



  function searchByGender(people){
    let gender = promptFor("What is the person's gender?", charsLetters);
  
    let personnelGender = people.filter(function (person){
      if(person.gender.toLowerCase() === gender.toLowerCase()){
        return true;
      }
    });
    
    return personnelGender;
}
//End of searchByGender

  function searchByDob(people){
    let dob = promptFor("What is the person's date of birth?", charsNumbers);
    dob = removeLeadingZeros(dob);
  
    let personnelDob = people.filter(function (person){
      if(person.dob === dob){
        return true;
      }
    });
    
    return personnelDob;
}
//searchByDob

  function searchByHeight(people){
    let height = promptFor("What is the person's height?", charsNumbers);
  
    let personnelHeight = people.filter(function (person){
      if(person.height == height){
        return true;
      }
    });
    
    return personnelHeight;
}
//End of searchByHeight

  function searchByWeight(people){
    let weight = promptFor("What is the person's weight?", charsNumbers);
  
    let personnelWeight = people.filter(function (person){
      if(person.weight == weight){
        return true;
      }
    });
  
    return personnelWeight;
}
//End of searchByWeight

  function searchByEyeColor(people){
    let eyeColor = promptFor("What is the person's eye color?", charsLetters);
  
    let personnelEyeColor = people.filter(function (person){
      if(person.eyeColor.toLowerCase() === eyeColor.toLowerCase()){
        return true;
      }
    });
  
    return personnelEyeColor;
}
//End of searchByEyeColor

  function searchByOccupation(people){
    let occupation = promptFor("What is the person's occupation?", charsLetters);
  
    let personnelOccupation = people.filter(function (person){
      if(person.occupation.toLowerCase() === occupation.toLowerCase()){
        return true;
      }
    });
  
    return personnelOccupation;
  }
//End of searchByOccupation

  