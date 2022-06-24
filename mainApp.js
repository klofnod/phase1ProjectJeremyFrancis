// fetch shortcut function makes multiple fetchs alot easier for me
function fetchShortCut(address){
    return fetch(address) 
    .then ( address => address.json())
}
// making an intail fetch to fill up mainCard with page 1's art
fetchShortCut('https://api.artic.edu/api/v1/artworks?fields=provenance_text,artist_display,dimensions,date_display,medium_display,exhibition_history,image_id,title,id,classification_titles,place_of_origin,?page=1&limit=1')
.then(objectBackFromQueryFetch => mainCardFill(objectBackFromQueryFetch.data[0]))
    // big function contain as much scope as possible
function mainCardFill (externalAPIObject){

    // Creating main DIvs for content. Then later if I want to create a new feature I can just add it to this array and have global access to it, made name intentional overkill as to not accendiently overwrite it later
    const listOfDivsForArtViewer = ['searchBar','topMenu', 'mainCard', 'commentLikeForm' ]
    listOfDivsForArtViewer.forEach(createDiv)

    // Any New Feature Added To This List Will Get Added To The Dom As A Div With A Unique Class Name To Allow Easy Access To Query And To Add Style
    function createDiv (divClass4Style){
        const websiteMain = document.querySelector('body')
        const newDiv = document.createElement('div')
        // Whatever Name Is Added To The Array Of List Of Divs Will Get That Class Name Added To It
        newDiv.classList.add(divClass4Style)
        // adds all Divs to page with clas names added
        websiteMain.append(newDiv)
    }

    //creating the main card which will display a img, title and artist all on one div then medium and demensions on another div and finally date displayed and exhibition history on another div
    //strech goal to display alt text when image is clicked on and a message to check back soon if no alt text exsits  
    const mainCard = document.querySelector('.mainCard')
    //const objectOfInfo = externalAPIObject.data[0]
    console.log('Log from mainCard Fill 30:',externalAPIObject)
    
    //creating image tile which will be a div with a <img/> and 2 x<h1>. To display img, title and artist
    const imageTile = document.createElement('div')
    const mainTitle = document.createElement('h1')
    const artistName = document.createElement('h1')
    const imageOfMain = document.createElement('img')
    
    //adding class name to imageTile for easy css manipulation 
    imageTile.classList.add('imageTile')
    
    // creating a medium tile which will be a div with a 2 x <p>. To display medium info and demensions info
    const mediumTile = document.createElement('div')
    const meduimP = document.createElement('p')
    const demensionsP = document.createElement('p')
    const classificationP = document.createElement('p')
    // adding class name to medium tile for easy css manipulation 
    mediumTile.classList.add('mediumTile')
    
    // adding classes to <p> tags for easy css manipulation
    meduimP.classList.add('mediumInfo')
    demensionsP.classList.add('mediumInfo')
    
    //creating a history tile which will be a div with a <h2> and <p>. To dosplay first date displayed and history of exhibitions
    const historyTile = document.createElement('div')
    const displayDateh2 = document.createElement('h2')
    const displayHistoryP = document.createElement('p')
    const placeOfOrgin = document.createElement('p')
    // adding classes to history tile and history p for easy css manipulation
    historyTile.classList.add('historyTile')
    displayHistoryP.classList.add('historyInfo')

    // comment section 
    const commentAndLikeSectionDiv = document.querySelector('.commentLikeForm')
    const commentDiv = document.createElement('div')
    const likeDiv = document.createElement('div')

    const commentSection = document.createElement('form')
    const commentField = document.createElement('input')
    const commentSubmitBTN = document.createElement('input')
    const commentList = document.createElement('ul')

    commentSection.classList.add('commentInputBar')
    commentList.classList.add('commentList')
    likeDiv.classList.add('likeButton')
    commentDiv.classList.add('commentSection')

    commentField.type = 'text'
    commentField.name = 'commentField'
    commentSubmitBTN.type = "submit"
    commentSubmitBTN.value = 'Personal Review'
        
    const likeBTN = document.createElement('button')

    likeBTN.id = 'likeBTN'
    //console.log ('LOG From Fill Main Card',objectWithNeededData.id)
    
    const logoIMG = document.createElement('img')
    logoIMG.classList.add('logoImage')
    logoIMG.src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Art_Institute_of_Chicago_logo.svg/1200px-Art_Institute_of_Chicago_logo.svg.png'
    
    //// comment section
    function createNewComment(address, body){
        return fetch(address,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
    }
    //function createCommentList (){
        //console.log('Log from jsoncomment: ',test)
        //let jsonCommentLi = document.createElement('li')
        //commentList.append(jsonCommentLi)
    //}
    //fetchShortCut('http://localhost:3000/artTitle')
    //.then(commentsArray => commentsArray.forEach(createCommentList))  
    //function newCommentPost(commentData) 
    // in above fetch call with invoking function I called it down on the 0 index of data array to get to object but will not me needed for full function so now it just takes in an object for rest of function
    fillMainCardWithSelection(externalAPIObject)
    const commentLi = document.createElement('li')
    //console.log('LOG From mainCardFill :',externalAPIObject.data[0])
    function fillMainCardWithSelection( objectWithNeededData){
        //console.log('LOG MakeThisWork: ', objectWithNeededData)
        // sets text content for artist and title from object back with keys
        //console.log(objectWithNeededData.id) 
        artistName.textContent = objectWithNeededData.artist_display
        mainTitle.textContent= objectWithNeededData.title
        // gets image id for a call for call to get image from a seprate built in fetch function 
        let imageIDForPic = objectWithNeededData.image_id
        // some art has no pic but still want history to be viewable so this checks for an image tag if none uses a places holder
        if(imageIDForPic === null) {
            imageOfMain.src = 'https://www.macewanfa.ca/public/uploads/images/noimageavailable/1537465439-330w_noimageavailable.jpg'
            }
            else imageOfMain.src= `https://www.artic.edu/iiif/2/${objectWithNeededData.image_id}/full/500,/0/default.jpg`
        function newCommentAppend(event){
            event.preventDefault()
            //console.log('if this works',objectWithNeededData.id)
            commentLi.textContent = event.target.commentField.value
            commentList.append(commentLi)
            let newComment = {
                id:objectWithNeededData.id,
                content:[event.target.commentField.value]
            }
        createNewComment('http://localhost:3000/artTitle', newComment)
        .then (newCommentData => newCommentData)
        }
        commentSection.addEventListener('submit', newCommentAppend)
            
        fetchShortCut(`http://localhost:3000/artTitle/${objectWithNeededData.id}`)
        .then(data => data.content.forEach(fillCommentList))
        function fillCommentList(arrayOfComments){
            console.log(arrayOfComments)
            const commentLi = document.createElement('li')
            commentLi.textContent= arrayOfComments
            commentList.append(commentLi)
            //comment section ////////////////////////////////////////////
        }

        imageOfMain.addEventListener('mouseenter', ()=>{
                        //console.log (imgAndTitleData.data)  
                        //let objectforMouseenter = imgAndTitleData.data
                        //console.log(objectforMouseenter)
                        placeOfOrgin.textContent = objectWithNeededData.place_of_origin
                        classificationP.textContent = objectWithNeededData.classification_titles
                        historyTile.append(placeOfOrgin)
                        mediumTile.append(classificationP)
                        imageOfMain.addEventListener('mouseleave', ()=>{
                            placeOfOrgin.remove()
                            classificationP.remove()
                        })
                    }) 
        ///provenance_text
        //artist_display
        //dimensions
        //date_display
        //medium_display
        //exhibition_history
        //"thumbnail": {alt_text
        // set text with medium and demensions info from object with keys
        meduimP.textContent= objectWithNeededData.medium_display
        demensionsP.textContent= objectWithNeededData.dimensions
       // sets display date and exhibition history if no history present fill with auto message 
        displayDateh2.textContent= "First Displayed In " + objectWithNeededData.date_display
        if (objectWithNeededData.exhibition_history === null){
            displayHistoryP.textContent= "No Info On History Of This Piece Please Try Again Later"
        }
            else displayHistoryP.textContent = objectWithNeededData.exhibition_history

        //appended all main card info to page elements are created earlier then secondary fill function so it overwrites after the first one
        mainCard.append(mediumTile,imageTile, historyTile)
        imageTile.append(mainTitle, imageOfMain, artistName)
        mediumTile.append(meduimP, demensionsP)
        historyTile.append(displayDateh2,displayHistoryP)
        // appending all comment section elements while main card is loaded so I can change comments with each new selection
        likeDiv.append(likeBTN)
        commentSection.append(commentField, commentSubmitBTN)
        commentDiv.append(commentSection, commentList)
        commentAndLikeSectionDiv.append(commentDiv, likeDiv)   
    }
    // this fetch is to start page with set of art to view I just chose animals to be default but any value could be passed here

    fetchShortCut(`https://api.artic.edu/api/v1/artworks/search?q=animals?page=1&limit=10`)
    .then(objectWithAPIKeys => fillTopMenu(objectWithAPIKeys)) 
 
    // function to fill topMenu which is begin called on the within the above fetch short cut to fill top menu on load with animal query from page one
    function fillTopMenu (objectFromAPIWithDataArrayInside){
        console.log('Log from fillTopmenu ', objectFromAPIWithDataArrayInside.data) 
        // grabbing Div with class of topMenu for later appending
        const topMenu = document.querySelector('.topMenu')   
        //SEARCH bar built into this function so that I could use scope to call the fill function once something is searched 
        // grabbing search bar Div to append later
        const searchBar = document.querySelector('.searchBar')
        // creating the search bar elemts to be appending later
        const searchBarDiv = document.createElement('div')
        const searchBarForm = document.createElement('form')
        const searchBarInput = document.createElement('input')
        const searchBTN = document.createElement('input')
        //const imageAndTitleDiv = document.createElement('div')
        // setting name type and value to html elements for easier selection and id later
        searchBarDiv.classList.add('searchBarDiv')
        searchBarForm.classList.add('fullSearchBar')
        searchBTN.type= 'submit'
        searchBTN.value= 'Search'
        //searchBarInput.value='animals' had this as I was trying to get it to load this and put it into the query when page loaded but went another way
        searchBarInput.type = 'text'
        searchBarInput.name = "searchBarInput"
        // search bar event listener for subimt function which grabs the search value and uses fetch shortcut plus just grabs the data Array back uses for each to fill with fill function also clears innerhtml 
        searchBarForm.addEventListener('submit', (event)=>{
            event.preventDefault()
            topMenu.innerHTML= ""
            let searchValue = event.target.searchBarInput.value
            //console.log(searchValue)

            fetchShortCut(`https://api.artic.edu/api/v1/artworks/search?q=${searchValue}?page=1&limit=10`)
            .then(databack => databack.data.forEach(fillImageAndTitleSection))
        })
        //console.log('LOG From FillTopMenu Function: ',objectFromAPIWithDataArrayInside)
        // appended search bar items to search bar DIV had to add items to form then to div as if input fields are outside form submit event wont work
        searchBar.append(logoIMG, searchBarDiv)
        searchBarForm.append(searchBarInput, searchBTN)
        searchBarDiv.append(searchBarForm)
        // SEARCH bar end of search bar function and append code

        // could run the for each through the objectFromAPIWithDataArrayInside.data and it worked sometimes but creating a array with fetch data then running it through function worked better
        const linkForInfo = objectFromAPIWithDataArrayInside.data
        linkForInfo.forEach(fillImageAndTitleSection)
        //console.log('Shortcut For API ID', linkForInfo)
        // creating a fill image function within main scope so I can use this function with search feature had to use immerhtml to clear above though as I am creating all elements with this function tried to work around but coiuldnt get anything to work
        function fillImageAndTitleSection (objectWithAPIkeysFromQuery){
            //console.log('LOG From FillImageAndTitleSection Function :' , objectWithAPIkeysFromQuery.api_link)
            //creating a new Div with image and title for top menu also adding class to new div for easy css selection
            const miniCard = document.createElement('div')
            miniCard.classList.add('allTopMenuItems')
            const imgData = document.createElement('img')
            const titleData = document.createElement('h3')
            // this wasnt needed but I was trying to seperate functions to reuse with search feature but ended up doing it this way and leaving this in had to grab the apikey from query search as it doesnt give back full data just the api keys        
            fetchShortCut(objectWithAPIkeysFromQuery.api_link)
            .then (newObject => createImgAndTitleCards(newObject))
            // function for adding info from each object of data back 
            function createImgAndTitleCards (imgAndTitleData){
                console.log('LOG From creeateimg function',imgAndTitleData.data.id)
                // I was having some trouble with string interoplation and the img fetch so I created a varible but then I got it working
                let imgID = imgAndTitleData.data.image_id
                //console.log(imgAndTitleData.data.image_id)
                
                imgData.addEventListener('click', ()=>{
                    console.log('Log from createimg', imgAndTitleData.data.id)
                    commentList.innerHTML=""
                    // creating a varible for data back fomr query search so i can run it through fill main card for click function
                    let objectForMainCardFunction = imgAndTitleData.data
                    fillMainCardWithSelection(objectForMainCardFunction)
                    // hoping putting mouse over event here will give me access to proper info    
                })

                // adding info from data fetch back onto image cards for top Menu if no image avalible throws up a default place holder image
                titleData.textContent=imgAndTitleData.data.title
                if(imgID === null){
                    imgData.src = 'https://www.macewanfa.ca/public/uploads/images/noimageavailable/1537465439-330w_noimageavailable.jpg'
                    }
                    else imgData.src = `https://www.artic.edu/iiif/2/${imgAndTitleData.data.image_id}/full/200,/0/default.jpg`
                //console.log(imgAndTitleData.data.image_id)
                // appending mini cards to top menu with click function built into each one as well as the fetch data for reuse in other functions
                miniCard.append(titleData,imgData)
                topMenu.append(miniCard)  
            }
        }        
    }
}
    
                
                
        
             
        
        
        
                
        
                


        
    
        



        

        
            
            
            
            
            
            
            
            
            
            
            
            
           
            
    
    
        
    
    
    
    
    
        

        
    
    
        
                
    
        
               
            

