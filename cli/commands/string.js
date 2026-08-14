export function uppercase(text){
    console.log(text.toUpperCase());
}

export function lowercase(text){
    console.log(text.toLowerCase());
}

export function wordCount(text){
    console.log(text.trim().split(/\s+/).length);
}

export function palindrome(text){

    const clean = text.replace(/\s/g,"").toLowerCase();

    if(clean === clean.split("").reverse().join(""))
        console.log("Palindrome");
    else
        console.log("Not Palindrome");
}