$("#postTextarea").keyup(event => {
    var textbox = $(event.target);
    var value = textbox.val().trim();
    
    var submitButton = $("#submitPostButton");

    if(submitButton.length == 0) return alert("No submit button found");

    if (value == "") {
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false);
})

$("#submitPostButton").click((event) => {
    var button = $(event.target);
    var textbox = $("#postTextarea");

    var data = {
        content: textbox.val()
    }

    $.post("/api/posts", data, (postData) => {
        var html = createPostHtml(postData);
        $(".postsContainer").prepend(html);
        textbox.val("");
        button.prop("disabled", true);
    })   
})

$(document).on("click", ".likeBtn", (event)=>{
    var button = $(event.target);
    var postId =  getPostIdFromElement(button);
    if (postId === undefined) return;

    $.ajax({
        url: `/api/posts/${postId}/likes`,
        type: "PUT",
        success: (postData) => {
            console.log(postData.likes.length);
        }
    })
})

function getPostIdFromElement(element){
    var isRoot = element.hasClass("post");
    var rootElement = isRoot? element : element.closest(".post");
    return rootElement.data().id;
}
function createPostHtml(postData){
    var postedBy = postData.postedBy;
    var name = postedBy.firstName + " " + postedBy.lastName;
    var date = timeDifference(new Date(), new Date(postData.createdAt));
    return `<div class = "post" data-id ='${postData._id}'  >
                <div class = "mainContentContainer">
                    <div class = "profilePicContainer">
                        <img src="${postedBy.profilePic}">
                    </div>
                    <div class = "postContentContainer">
                        <div class = "header">
                            <a href = "/profile/${postedBy.username}" class = "displayName">${name}</a>
                            <span class = "username">@${postedBy.username}</span>
                            <span class = "date">${date}</span>
                        </div>
                        <div class = "postBody">
                            <span>${postData.content}</span>
                        </div>
                        <div class = "postFooter">
                            <div class = "postButtonContainer">
                                <button>
                                    <i class="fa-regular fa-comment"></i>
                                </button>
                            </div>
                            <div class = "postButtonContainer">
                                <button>
                                    <i class="fa-solid fa-retweet"></i>
                                </button>
                            </div>
                            <div class = "postButtonContainer">
                                <button class = "likeBtn">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                            
                           
                            
                        </div>
                    </div>
                </div>
    
            </div>`
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (elapsed/1000 < 30) return 'Just Now';
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}